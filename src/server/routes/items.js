import mongoose from 'mongoose'
import {initialItems} from './initialItems'
const logger = require('winston')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)

const storeTimeStamps = {
  timestamps: true
}
const schema = new mongoose.Schema({
  name: String,
  url: String,
  selector: String,
  title: String,
  fullText: String,
  fetchDate: Date,
  fetchError: String,
  lastFetch: mongoose.Schema.Types.Mixed, // Should we give this more shape?
  image: Buffer // TODO
}, storeTimeStamps)

const Item = mongoose.model('Item', schema)

export const initialize = () => {
  Item.count({}).exec()
    .then(n => {
      if (n === 0) {
        logger.info(`Populating ${initialItems.length} initial items.`)
        initialItems.forEach(item => Item.create(item))
      }
    })
}

export const findAll = (req, res) => {
  Item.find().exec((e, items) => {
    res.send(items)
  })
}

export const add = (req, res) => {
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

export const get = (id) => Item.findOne({ _id: id }).lean().exec()

export const update = (req, res) => {
  const id = req.params.id
  const item = req.body
  Item.update({ _id: id }, { $set: item })
    .then(() => get(id))
    .then((item) => {
      res.send(item)
      afterUpdate(item)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

export const remove = (req, res) => {
  const id = req.params.id

  get(id)
    .then((item) => {
      Item.remove({ _id: id })
        .then(() => res.send({ ok: true }))
      return item
    })
    .then(afterDelete)
    .catch((e) => {
      res.status(500).send(e)
    })
}
const fs = require('fs')

export const updateImage = (req, res) => {
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

export const getImage = (req, res) => {
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

const afterCreate = (item) => {
  dispatch('item_created', item)
}

const afterDelete = (item) => {
  dispatch('item_deleted', item)
}

const afterUpdate = (item) => {
  dispatch('item_updated', item)
}

const dispatch = (type, item) => {
  logger.info(`Dispatching to ${webSockets.length}`)
  webSockets.forEach(ws => ws.emit('event', {
    type,
    item
  }))
}

const webSockets = []
export const pipeEvents = (ws) => {
  logger.info(`item connected to websocket ${ws.id}`)
  webSockets.push(ws)
  ws.on('disconnect', () => {
    logger.info(`disconnecting websocket ${ws.id}`)
    webSockets.splice(webSockets.indexOf(ws))
  })
  ws.on('reconnect', () => logger.info('FIXME socket reconnect not handled'))
}
