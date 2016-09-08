const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

const Item = mongoose.model('Item', {
  name: String,
  skills: String
})

exports.findAll = (req, res) => {
  Item.find().exec((e, items) => {
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
    }
  })
}

exports.delete = (req, res) => {
  var id = req.params.id
  Item.remove({ _id: id }, (err) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send({ ok: true })
    }
  })
}

const eventListeners = []

const afterCreate = (item) => {
  eventListeners.forEach((l) => l.updated(item))
}

exports.pipeEvents = (ws) => {
  const listener = {
    updated: (item) => {
      ws.send(JSON.stringify({
        type: 'item_created',
        item: item
      }))
    }
  }
  eventListeners.push(listener)
  ws.on('close', () => {
    eventListeners.splice(eventListeners.indexOf(listener))
  })
}
