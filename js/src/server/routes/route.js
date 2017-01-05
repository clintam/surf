const logger = require('winston')

class Route {

  exposeError(res) {
    return e => {
      logger.error(e)
      res.status(500).send(e)
    }
  }
}
module.exports = Route
