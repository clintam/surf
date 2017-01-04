const mongoose = require('mongoose')

class DB {
  constructor() {
    this.mongoose = mongoose
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/test`)
  }
}

module.exports = DB
