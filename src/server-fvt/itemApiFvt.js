const expect = require('chai').expect
const ItemClient = require('../common/itemClient')
const uuid = require('uuid')
var client = new ItemClient()

describe('/items/', () => {
  it('should list', () => {
    return client.list()
      .then((items) => {
        expect(items.length).to.be.a.int
      })
  })

  it('should CRUD', () => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }
    return client.create(toCreate)
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
  })

  it('should stream events', (done) => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }
    const updatedName = toCreate.name + '-updated'

    client.openRTM(({ type, item }) => {
      if (type === 'item_created' && item.name === toCreate.name) {
        item.name = updatedName
        client.update(item)
      } else if (type === 'item_updated' && item.name === updatedName) {
        client.delete(item)
      } else if (type === 'item_deleted' && item.name === updatedName) {
        done()
      }
    })

    client.create(toCreate)
  })
})
