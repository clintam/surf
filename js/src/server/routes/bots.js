const {initialBots} = require('./initialConfig')
const CrudRoute = require('./crudRoute')

class Bots extends CrudRoute {
  constructor(db) {
    const storeTimeStamps = {
      timestamps: true
    }
    const schema = new db.mongoose.Schema({
      name: String,
      token: String,
      error: String,
      lastStart: db.mongoose.Schema.Types.Mixed
    }, storeTimeStamps)

    const model = db.mongoose.model('Bot', schema)
    super(db, model)
  }

  initialize() {
    super.initializeDefaults(initialBots)
  }

}

module.exports = Bots
