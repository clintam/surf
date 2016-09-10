const mongoose = require('mongoose')
const itemDomain = require('../../common/itemDomain')
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

const schema = {
  name: String,
  color: {
    type: String,
    default: '#000000',
    validate: {
      validator: function (v) {
        return itemDomain.validColors().includes(v)
      },
      message: '{VALUE} is not a valid color'
    }
  }
}

const Item = mongoose.model('Item',
  new mongoose.Schema(schema, {
    timestamps: true
  }))

exports.findAll = (req, res) => {
  Item.find().sort({ createdAt: -1 }).exec((e, items) => {
    res.send(items)
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
  Item.update({ _id: id }, item)
    .then(() => {
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
    eventListeners.splice(eventListeners.indexOf(listener))
  })
}
