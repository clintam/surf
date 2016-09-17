const expect = require('chai').expect
const ItemClient = require('../common/itemClient')
const uuid = require('uuid')
var client = new ItemClient()

describe('/items/', () => {
  it('should list', () => {
    return client.items().list()
      .then((items) => {
        expect(items.length).to.be.a('number')
      })
  })

  it('should CRUD', () => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }
    return client.items().create(toCreate)
      .then((created) => {
        expect(created).to.have.property('_id')
        expect(created).to.have.property('__v')
        expect(created).to.have.property('updatedAt')
        expect(created).to.have.property('createdAt')
        expect(created).to.have.property('name', toCreate.name)
        created.name = `${created.name}-updated`
        return client.items().update(created)
      })
      .then((updated) => {
        expect(updated.name).to.equal(`${toCreate.name}-updated`)
        return client.items().delete(updated)
      })
      .then((deleted) => {
        expect(deleted).to.have.property('ok')
      })
  })

  it('should stream CRUD events over websocket', (done) => {
    const toCreate = {
      name: `test-${uuid.v1()}`
    }
    const updatedName = toCreate.name + '-updated'

    client.openRTM(({ type, item }) => {
      if (type === 'item_created' && item.name === toCreate.name) {
        item.name = updatedName
        client.items().update(item)
      } else if (type === 'item_updated' && item.name === updatedName) {
        client.items().delete(item)
      } else if (type === 'item_deleted' && item.name === updatedName) {
        expect(item).to.have.property('_id')
        done()
      }
    })

    client.items().create(toCreate)
  })
})
