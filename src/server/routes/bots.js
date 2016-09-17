const {initialBots} = require('./initialItems')
const CrudRoute = require('./crudRoute')
const logger = require('winston')

class Bots extends CrudRoute {
  constructor(db) {
    const storeTimeStamps = {
      timestamps: true
    }
    const schema = new db.mongoose.Schema({
      name: String,
      token: String
    }, storeTimeStamps)

    const model = db.mongoose.model('Bot', schema)
    super(db, model)
  }

  initialize() {
    this.model.count({}).exec()
      .then(n => {
        if (n === 0) {
          logger.info(`Populating ${initialBots.length} initial bots.`)
          initialBots.forEach(bot => this.model.create(bot))
        }
      })
  }

}

module.exports = Bots
