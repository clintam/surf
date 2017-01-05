const CrudRoute = require('./crudRoute')
const hash = require('object-hash')
const {textProcessor} = require('../textProcessor')

class Data extends CrudRoute {
  constructor(db) {
    const storeTimeStamps = {
      timestamps: true
    }
    const schema = new db.mongoose.Schema({
      name: String,
      keys: {
        type: [String],
        required: true
      },
      text: String,
      textHash: {
        type: String,
        index: true,
        required: true,
        unique: true
      },
      href: String,
      imgSrc: String,
      error: String,
      lastRun: db.mongoose.Schema.Types.Mixed
    }, storeTimeStamps)

    const model = db.mongoose.model('data', schema)
    super(db, model)
  }

  beforeSave(data) {
    data.text = textProcessor(data.text)
    data.textHash = hash(data.text)

    return this.model.findOne({textHash: data.textHash})
      .then(existing => {
        if (!existing) {
          return {
            item: data
          }
        }
        let needUpdate = false
        data.keys.forEach(key => {
          if (existing.keys.indexOf(key) === -1) {
            existing.keys.push(key)
            needUpdate = true
          }
        })
        if (needUpdate) {
          return this.model.update({_id: existing._id}, {$set: existing})
            .then(_ => {
              return {
                result: {
                  updated: existing._id
                }
              }
            })
        } else {
          return {
            result: {
              updated: null
            }
          }
        }
      })
  }

}

module.exports = Data
