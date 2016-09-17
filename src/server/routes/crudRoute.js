const logger = require('winston')

class CrudRoute {
  constructor(db, model) {
    this.mongoose = db.mongoose
    this.webSockets = []
    this.model = model
  }

  routeName() {
    return this.model.modelName.toLowerCase() + 's'
  }

  mountApp(app) {
    this.initialize()
    const baseUrl = this.routeName()
    app.get(`/${baseUrl}`, CrudRoute.prototype.findAll.bind(this))
    app.post(`/${baseUrl}`, CrudRoute.prototype.add.bind(this))
    app.put(`/${baseUrl}/:id`, CrudRoute.prototype.update.bind(this))
    app.delete(`/${baseUrl}/:id`, CrudRoute.prototype.remove.bind(this))
  }

  findAll(req, res) {
    this.model.find().exec((e, items) => {
      res.send(items)
    })
  }

  add(req, res) {
    const item = req.body

    this.model.create(item)
      .then((created) => {
        res.send(created)
        this.afterCreate(created)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  }

  get(id) { return this.model.findOne({ _id: id }).lean().exec() }

  update(req, res) {
    const id = req.params.id
    const item = req.body
    this.model.update({ _id: id }, { $set: item })
      .then(() => this.get(id))
      .then((item) => {
        res.send(item)
        this.afterUpdate(item)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  }

  remove(req, res) {
    const id = req.params.id

    this.get(id)
      .then((item) => {
        this.model.remove({ _id: id })
          .then(() => res.send({ ok: true }))
        return item
      })
      .then((item) => this.afterDelete(item))
      .catch((e) => {
        res.status(500).send(e)
      })
  }

  eventTypeName() {
    return this.model.modelName.toLowerCase()
  }

  afterCreate(item) {
    this.dispatch(`${this.eventTypeName()}_created`, item)
  }

  afterDelete(item) {
    this.dispatch(`${this.eventTypeName()}_deleted`, item)
  }

  afterUpdate(item) {
    this.dispatch(`${this.eventTypeName()}_updated`, item)
  }

  dispatch(type, item) {
    logger.info(`Dispatching ${type} to ${this.webSockets.length}`)
    this.webSockets.forEach(ws => ws.emit('event', {
      type,
      item
    }))
  }

  pipeEvents(ws) {
    logger.info(`item connected to websocket ${ws.id}`)
    this.webSockets.push(ws)
    ws.on('disconnect', () => {
      logger.info(`disconnecting websocket ${ws.id}`)
      this.webSockets.splice(this.webSockets.indexOf(ws))
    })
    ws.on('reconnect', () => logger.info('FIXME socket reconnect not handled'))
  }

}
module.exports = CrudRoute
