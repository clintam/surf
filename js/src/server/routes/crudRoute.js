const logger = require('winston')
const {expect} = require('chai')
const Route = require('./route')

class CrudRoute extends Route {
  constructor(db, model) {
    super()
    this.mongoose = db.mongoose
    this.webSockets = []
    this.model = model
  }

  routeName() {
    return this.model.modelName.toLowerCase() + 's'
  }

  initialize() {

  }

  initializeDefaults(values) {
    return this.model.count({}).exec()
      .then(n => {
        if (n === 0) {
          logger.info(`Populating ${values.length} initial ${this.routeName()}.`)
          values.forEach(v => this.model.create(v))
        }
      })
  }

  mountApp(app) {
    this.initialize()
    const baseUrl = `/api/${this.routeName()}`
    app.get(`${baseUrl}`, CrudRoute.prototype.findAll.bind(this))
    app.post(`${baseUrl}`, CrudRoute.prototype.add.bind(this))
    app.put(`${baseUrl}/:id`, CrudRoute.prototype.update.bind(this))
    app.delete(`${baseUrl}/:id`, CrudRoute.prototype.remove.bind(this))
  }

  findAll(req, res) {
    this.model.find().exec((e, items) => {
      res.send(items)
    })
  }

  beforeSave(item) {
    return Promise.resolve({item})
  }

  add(req, res) {
    const item = req.body
    this.beforeSave(item)
      .then(toSave => toSave.item ? this.model.create(toSave.item) : toSave.result)
      .then((created) => {
        res.send(created)
        this.afterCreate(created)
      })
      .catch(this.exposeError(res))
  }

  get(id) {
    return this.model.findOne({_id: id}).lean().exec()
  }

  update(req, res) {
    const id = req.params.id
    const item = req.body
    this.beforeSave(item)
      .then(toSave => toSave.item ? this.model.update({_id: id}, {$set: toSave.item}) : toSave.result)
      .then(() => this.get(id))
      .then((item) => {
        res.send(item)
        this.afterUpdate(item)
      })
      .catch(this.exposeError(res))
  }

  remove(req, res) {
    const id = req.params.id

    this.get(id)
      .then((item) => {
        this.model.remove({_id: id})
          .then(() => res.send({ok: true}))
        return item
      })
      .then((item) => this.afterDelete(item))
      .catch(this.exposeError(res))
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
    const event = {type}
    event[this.eventTypeName()] = item
    this.webSockets.forEach(ws => ws.emit('event', event))
  }

  pipeEvents(ws) {
    logger.info(`${this.routeName()} connected to websocket ${ws.id}`)
    this.webSockets.push(ws)
    ws.on('disconnect', () => {
      logger.info(`removing websocket ${ws.id} from ${this.routeName()} events`)
      const i = this.webSockets.indexOf(ws)
      expect(i).to.be.above(-1)
      this.webSockets.splice(i, 1)
    })
    ws.on('connect', () => logger.info('FIXME socket reconnect not handled ${ws.id}'))
  }

}
module.exports = CrudRoute
