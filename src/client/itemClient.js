var http = require('axios')
const toJson = (res) => res.data

class ItemClient {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  list() {
    return http.get(this.url)
      .then(toJson)
  }

  create(item) {
    return http.post(this.url, item).then(toJson)
  }

  update(item) {
    return http.put(this.url + '/' + item._id, item).then(toJson)
  }

  delete(item) {
    return http.delete(this.url + '/' + item._id).then(toJson)
  }

}

module.exports = ItemClient
