const CrudRoute = require('./crudRoute')
const {initialPredictions} = require('./initialConfig')

class Predictions extends CrudRoute {
  constructor(db) {
    const storeTimeStamps = {
      timestamps: true
    }
    const schema = new db.mongoose.Schema({
      name: String,
      tag: String,
      keys: [String],
      error: String,
      lastRun: db.mongoose.Schema.Types.Mixed
    }, storeTimeStamps)

    const model = db.mongoose.model('Prediction', schema)
    super(db, model)
  }

  initialize() {
    super.initializeDefaults(initialPredictions)
  }

}

module.exports = Predictions
