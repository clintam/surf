var mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

var Item = mongoose.model('Item', {
  name: String,
  skills: String
})

exports.findById = function (req, res) {
  // TODO
}

exports.findAll = function (req, res) {
  Item.find().exec((e, items) => {
    res.send(items)
  })
}

exports.add = function (req, res) {
  const item = req.body

  Item.create(item, (err, created) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send(created)
    }
  })
}

exports.update = function (req, res) {
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

exports.delete = function (req, res) {
  var id = req.params.id
  Item.remove({ _id: id }, (err) => {
    if (err) {
      res.send({ 'error': 'An error has occurred' })
    } else {
      res.send({ ok: true })
    }
  })
}
