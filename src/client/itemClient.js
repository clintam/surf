/* global location */
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
    const url = urlApi.parse(this.url)
    const host = url.host || location.host
    const webSocketUrl = `http://${host}/`
    var socket = require('socket.io-client')(webSocketUrl)
    socket.on('event', function (data) {
      onEvent(data)
    })
  }

}

module.exports = ItemClient
