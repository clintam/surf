/* global location */
const http = require('axios')
const urlApi = require('url')

const toJson = (res) => res.data

class Route {
  constructor(url) {
    this.url = url
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

class ItemRoute extends Route {

  updateImage(itemId, imageBuffer) {
    const fs = require('fs')
    const bluebird = require('bluebird')
    const writeFileAsync = bluebird.promisify(fs.writeFile)
    return writeFileAsync(`images/${itemId}.png`, imageBuffer)
    // FIXME could not get this to work over http.
    // return http.post(`${this.url}/${itemId}/image`, imageBuffer).then(toJson)
  }
}

class Query {
  constructor(url) {
    this.url = url
  }

  run(query) {
    return http.post(this.url + '/run', query).then(toJson)
  }
}

class SurfClient {
  constructor(url) {
    this.url = url || `http://${process.env.SERVER_HOST || 'localhost'}:8080/api`
  }

  items() {
    return new ItemRoute(`${this.url}/items`)
  }

  bots() {
    return new Route(`${this.url}/bots`)
  }

  predictions() {
    return new Route(`${this.url}/predictions`)
  }

  data() {
    return new Route(`${this.url}/datas`)
  }

  query() {
    return new Query(`${this.url}/query`)
  }

  openRTM(onEvent, clientNameForLogging) {
    const url = urlApi.parse(this.url)
    const host = url.host || location.host
    const webSocketUrl = `http://${host}/`
    var socket = require('socket.io-client')(webSocketUrl, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 1000
    })

    socket.on('event', onEvent)
    socket.on('connect', () => console.log(`items RTM open for ${socket.id} (${clientNameForLogging})`))
    socket.on('disconnect', (data) => console.log(`items disconnect ${socket.id} (${clientNameForLogging})`))
    socket.on('reconnect', (data) => console.log(`items reconnect ${socket.id} (${clientNameForLogging})`))
    socket.on('reconnecting', (data) => console.log(`items reconnecting ${socket.id} (${clientNameForLogging})`))
    socket.on('reconnect_error', (data) => console.log(`items reconnect_error ${socket.id} (${clientNameForLogging})`))
    socket.on('reconnect_failed',
      (data) => console.log(`items reconnect_failed ${socket.id} (${clientNameForLogging})`))
    socket.on('connect_error',
      (data) => console.log(`items connect_error ${socket.id} (${clientNameForLogging})`))

    // HACK to keep socket open
    setInterval(() => {
      if (!socket.connected) {
        console.log('Running my reconnect HACK???')
        socket.io.connect()
      }
    }, 2000)
  }

}

module.exports = SurfClient
