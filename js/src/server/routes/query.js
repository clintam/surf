const bluebird = require('bluebird')

class Query {
  mountApp(app) {
    const baseUrl = '/api/query'
    app.post(`${baseUrl}/run`, Query.prototype.run.bind(this))
  }

  run(req, res) {
    // const query = req.body
    bluebird.delay('500') // FIXME call to real prediction service
      .then(_ => {
        res.send({result: Math.random() < 0.5 ? 'Rotten' : 'Good'})
      })
  }
}

module.exports = Query
