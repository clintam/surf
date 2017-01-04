const expect = require('chai').expect
const ItemClient = require('../common/itemClient')
const uuid = require('uuid')
var client = new ItemClient()

describe('Webservice API', function () {
  this.timeout(60000)

  const testEndpoint = (name) => {
    const pluralName = `${name}s`
    const clientRoute = client[pluralName]()

    describe(`/${pluralName}/`, () => {
      it('should list', () => clientRoute.list().then(results => expect(results.length).to.be.a('number')))

      it('should CRUD', () => {
        const toCreate = {
          name: `test-${uuid.v1()}`
        }
        return clientRoute.create(toCreate)
          .then((created) => {
            expect(created).to.have.property('_id')
            expect(created).to.have.property('__v')
            expect(created).to.have.property('updatedAt')
            expect(created).to.have.property('createdAt')
            expect(created).to.have.property('name', toCreate.name)
            created.name = `${created.name}-updated`
            return clientRoute.update(created)
          })
          .then((updated) => {
            expect(updated.name).to.equal(`${toCreate.name}-updated`)
            return clientRoute.delete(updated)
          })
          .then((deleted) => {
            expect(deleted).to.have.property('ok')
          })
      })

      it('should stream CRUD events over websocket', (done) => {
        const toCreate = {
          name: `apiFvt-test-${uuid.v1()}`
        }
        const updatedName = toCreate.name + '-updated'

        client.openRTM(event => {
          const type = event.type
          const item = event[name]
          if (type === `${name}_created` && item.name === toCreate.name) {
            item.name = updatedName
            clientRoute.update(item)
          } else if (type === `${name}_updated` && item.name === updatedName) {
            clientRoute.delete(item)
          } else if (type === `${name}_deleted` && item.name === updatedName) {
            expect(item).to.have.property('_id')
            done()
          }
        })

        clientRoute.create(toCreate)
      })
    })
  }

  testEndpoint('item')
  testEndpoint('bot')
})
