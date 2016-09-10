const expect = require('chai').expect
const ItemClient = require('../common/itemClient')
const uuid = require('uuid')
var client = new ItemClient()

describe('/items/', () => {
  it('should list', (done) => {
    client.list()
      .then((items) => {
        expect(items.length).to.be.a.int
        done()
      })
      .catch(done)
  })

  it('should CRUD', (done) => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }
    client.create(toCreate)
      .then((created) => {
        expect(created._id).to.exist
        expect(created.__v).to.exist
        expect(created.updatedAt).to.exist
        expect(created.createdAt).to.exist
        expect(created.name).to.equal(toCreate.name)
        created.name = `${created.name}-updated`
        return client.update(created)
      })
      .then((updated) => {
        expect(updated.name).to.equal(`${toCreate.name}-updated`)
        return client.delete(updated)
      })
      .then((deleted) => {
        expect(deleted.ok).to.be.defined
      })
      .then(done)
      .catch(done)
  })

  it('should stream events', (done) => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }

    client.openRTM((event) => {
      if (event.type === 'item_created' && event.item.name === toCreate.name) {
        client.delete(event.item)
          .then(() => done())
      }
    })

    client.create(toCreate)
  })
})
