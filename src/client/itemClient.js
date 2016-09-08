var http = require('axios')
var urlApi = require('url')

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

  openRTM(onEvent) {
    const WebSocket = require('ws')
    const url = urlApi.parse(this.url)
    const webSocketUrl = `ws://${url.hostname}:${url.port}/rtm`
    this.ws = new WebSocket(webSocketUrl)
    this.ws.on('message', (body) => {
      onEvent(JSON.parse(body))
    })
  }

}

module.exports = ItemClient
