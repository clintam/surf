const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

const Item = mongoose.model('Item',
  new mongoose.Schema({
    name: String,
    skills: String
  }, {
    timestamps: true
  }))

exports.findAll = (req, res) => {
  Item.find().sort({updatedAt: -1}).exec((e, items) => {
    res.send(items)
  })
}

exports.add = (req, res) => {
  const item = req.body

  Item.create(item, (err, created) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send(created)
      afterCreate(created)
    }
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const item = req.body
  Item.update({ _id: id }, item, (err) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send(item)
      afterUpdate(item)
    }
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  const itemShell = { _id: id }

  Item.remove(itemShell, (err) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send({ ok: true })
      afterDelete(itemShell)
    }
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
