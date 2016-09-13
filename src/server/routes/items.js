const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

const storeTimeStamps = {
  timestamps: true
}
const schema = new mongoose.Schema({
  name: String,
  url: {
    type: String,
    validate: {
      validator: (url) => true, // FIXME
      message: '{VALUE} is not a valid URL'
    }
  },
  selector: String,
  title: String,
  fullText: String,
  fetchDate: Date,
  fetchError: String,
  lastFetch: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
  image: Buffer, // TODO
  done: {
    type: Boolean,
    default: false
  }
}, storeTimeStamps)

const Item = mongoose.model('Item', schema)

// REVIEW: the mongoose model does not have json fields on it? How does json render
const slimItem = (row) => row // Object.assign({}, row._doc, { image: null })
exports.findAll = (req, res) => {
  Item.find().exec((e, items) => {
    res.send(items.map(slimItem))
  })
}

exports.add = (req, res) => {
  const item = req.body

  Item.create(item)
    .then((created) => {
      res.send(created)
      afterCreate(created)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  const item = req.body
  Item.update({ _id: id }, { $set: item })
    .then((x) => {
      res.send(item)
      afterUpdate(item)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  const itemShell = { _id: id }

  Item.remove(itemShell)
    .then(() => {
      res.send({ ok: true })
      afterDelete(itemShell)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}
const fs = require('fs')

exports.updateImage = (req, res) => {
  const id = req.params.id
  // const item = {
  //   _id: id,
  //   image: req.rawBody
  // }
  // return Item.update({ _id: id }, item)
  //   .then(() => {
  //     res.send(item)
  //     afterUpdate(item)
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e)
  //   })
  fs.writeFile(`images/${id}.png`, req.rawBody, (e) => {
    res.status(500).send(e)
  })
}

exports.getImage = (req, res) => {
  const id = req.params.id
  // return Item.findOne({ _id: id })
  //   .exec((e, item) => {
  //     if (e) {
  //       res.status(500).send(e)
  //       return
  //     }
  //     if (!item) {
  //       res.status(404).send('not found')
  //       return
  //     }
  //     //const base64 = (item.image.toString('base64')
  //     res.contentType('image/png')
  //     res.send(item.image)
  //   })

  fs.readFile(`images/${id}.png`, (e, data) => {
    if (e) {
      res.status(500).send(e)
      return
    }
    res.contentType('image/png')
    res.send(data)
  })
}

const eventListeners = []

const afterCreate = (item) => {
  eventListeners.forEach((l) => l.created(item))
}

const afterDelete = (item) => {
  eventListeners.forEach((l) => l.deleted(item))
}

const afterUpdate = (item) => {
  eventListeners.forEach((l) => l.updated(item))
}

exports.pipeEvents = (ws) => {
  const sendEvent = (type) => (item) => {
    console.log(`emitting ${type} to ${ws.id}`)
    ws.emit('event', {
      type: type,
      item: item
    })
  }
  const listener = {
    created: sendEvent('item_created'),
    deleted: sendEvent('item_deleted'),
    updated: sendEvent('item_updated')
  }
  eventListeners.push(listener)
  ws.on('disconnect', () => {
    console.log(`disconnecting from ${ws.id}`)
    eventListeners.splice(eventListeners.indexOf(listener))
  })
}
