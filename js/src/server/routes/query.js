const Route = require('./route')
const {computePredictions} = require('../predictionService')

class Query extends Route {
  constructor(predictionModelPromise) {
    super()
    this.predictionModelPromise = predictionModelPromise
  }

  mountApp(app) {
    const baseUrl = '/api/query'
    app.post(`${baseUrl}/run`, Query.prototype.run.bind(this))
  }

  run(req, res) {
    computePredictions(req.body.inputs, this.predictionModelPromise)
      .then(result => {
        res.send(result)
      })
      .catch(this.exposeError(res))
  }
}

module.exports = Query
