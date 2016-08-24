var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://"+getUrl()+":8080/items";
var ItemClient = require('../../src/client/itemClient');
var client = new ItemClient(baseUrl);
var uuid = require('uuid');

function getUrl() {
    return process.env.SERVER_HOST || 'localhost'
}

describe("items endpoint", function () {

    it("should list", function (done) {
        client.list()
            .then(function (items) {
                expect(items.length).to.be.a.int;
                done();
            })
            .catch(done);
    });

    it('should CRUD', function (done) {
        var toCreate = {
            name: 'test-'+uuid.v1()
        };
        client.create(toCreate)
            .then(function (created) {
                expect(created.id).to.be.defined;
                expect(created.name).to.equal(toCreate.name);
                created.name = created.name + '-updated';
                return client.update(created);
            })
            .then(function (updated) {
                expect(updated.name).to.equal(toCreate.name + '-updated');
                return client.delete(updated);
            })
            .then(function (deleted) {
               expect(deleted.ok).to.be.defined;
            })
            .then(done)
            .catch(done)
    });
});
