/* global location */
var http = require('axios')
var urlApi = require('url')

const toJson = (res) => res.data

class ItemClient {
  constructor(url) {
    this.url = url || `http://${process.env.SERVER_HOST || 'localhost'}:8080/items`
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

  updateImage(itemId, imageBuffer) {
    const fs = require('fs')
    fs.writeFile(`images/${itemId}.png`, imageBuffer, (e) => {
      if (e) {
        console.log('could not write' + e)
      }
    })
    // FIXME could not get this to work over http.
    // return http.post(`${this.url}/${itemId}/image`, imageBuffer).then(toJson)
  }

  delete(item) {
    return http.delete(this.url + '/' + item._id).then(toJson)
  }

  openRTM(onEvent) {
    const url = urlApi.parse(this.url)
    const host = url.host || location.host
    const webSocketUrl = `http://${host}/`
    var socket = require('socket.io-client')(webSocketUrl, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 1000
    })
    socket.on('event', function (data) {
      onEvent(data)
    })
  }

}

module.exports = ItemClient
