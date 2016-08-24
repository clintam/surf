import { expect } from 'chai'
import ItemClient from '../../src/client/itemClient'
import uuid from 'uuid'

const getUrl = () => process.env.SERVER_HOST || 'localhost'
const baseUrl = `http://${getUrl()}:8080/items`
var client = new ItemClient(baseUrl)

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
      name: 'test-' + uuid.v1()
    }
    client.create(toCreate)
      .then((created) => {
        expect(created.id).to.be.defined
        expect(created.name).to.equal(toCreate.name)
        created.name = created.name + '-updated'
        return client.update(created)
      })
      .then((updated) => {
        expect(updated.name).to.equal(toCreate.name + '-updated')
        return client.delete(updated)
      })
      .then((deleted) => {
        expect(deleted.ok).to.be.defined
      })
      .then(done)
      .catch(done)
  })
})
