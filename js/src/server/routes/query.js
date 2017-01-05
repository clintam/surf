const http = require('axios')
const Route = require('./route')

class Query extends Route {
  constructor(predictionModel) {
    super()
    this.predictionModel = predictionModel
  }

  mountApp(app) {
    const baseUrl = '/api/query'
    app.post(`${baseUrl}/run`, Query.prototype.run.bind(this))
  }

  run(req, res) {
    const predictHost = process.env.PREDICTOR_HOST || 'predictor:8080'
    const url = `http://${predictHost}/predict`

    Promise.all(
      [
        this.predictionModel.findOne({tag: 'rotten'}),
        http.post(url, req.body)
      ]
    )
      .then(results => {
        const predictionModel = results[0]
        const predictionResults = results[1].data.result
        const result = predictionResults.map(i => predictionModel.keys[i])
        res.send(result)
      })
      .catch(this.exposeError(res))
  }
}

module.exports = Query
