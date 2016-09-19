const {initialItems} = require('./initialItems')
const CrudRoute = require('./crudRoute')
const fs = require('fs')

class Items extends CrudRoute {
  constructor(db) {
    const storeTimeStamps = {
      timestamps: true
    }
    const schema = new db.mongoose.Schema({
      name: String,
      url: String,
      selector: String,
      title: String,
      fullText: String,
      fetchDate: Date,
      fetchError: String,
      lastFetch: db.mongoose.Schema.Types.Mixed, // Should we give this more shape?
      image: Buffer // TODO
    }, storeTimeStamps)

    const model = db.mongoose.model('Item', schema)
    super(db, model)
  }

  mountApp(app) {
    super.mountApp(app)
    const baseUrl = this.routeName()
    app.get(`/${baseUrl}/:id/image.png`, Items.prototype.getImage.bind(this))
    app.post(`/${baseUrl}/:id/image`, Items.prototype.updateImage.bind(this))
  }

  initialize() {
    return super.initializeDefaults(initialItems)
  }

  updateImage(req, res) {
    const id = req.params.id
    // const item = {
    //   _id: id,
    //   image: req.rawBody
    // }
    // return Item.update({ _id: id }, item)
    //   .then(() => {
    //     res.send(item)
    //     afterUpdate(item)
    //   })
    //   .catch((e) => {
    //     res.status(500).send(e)
    //   })
    fs.writeFile(`images/${id}.png`, req.rawBody, (e) => {
      res.status(500).send(e)
    })
  }

  getImage(req, res) {
    const id = req.params.id
    // return Item.findOne({ _id: id })
    //   .exec((e, item) => {
    //     if (e) {
    //       res.status(500).send(e)
    //       return
    //     }
    //     if (!item) {
    //       res.status(404).send('not found')
    //       return
    //     }
    //     //const base64 = (item.image.toString('base64')
    //     res.contentType('image/png')
    //     res.send(item.image)
    //   })

    fs.readFile(`images/${id}.png`, (e, data) => {
      if (e) {
        res.status(500).send(e)
        return
      }
      res.contentType('image/png')
      res.send(data)
    })
  }

}
module.exports = Items
