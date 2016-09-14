const express = require('express')
const items = require('./routes/items')
const bodyParser = require('body-parser')

const path = require('path')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')

import * as webFetcher from './webFetcher'

// Client side

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src/web',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

const app = express()
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/index.html', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

// FIXME make image served from mongo
const saveRawBody = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(bodyParser.json({ verify: saveRawBody }))
app.use(bodyParser.urlencoded({ verify: saveRawBody, extended: true }))
// app.use(bodyParser.raw({ verify: saveRawBody, type: () => true }))

app.get('/items', items.findAll)
app.post('/items', items.add)
app.put('/items/:id', items.update)
app.post('/items/:id/image', (x, y) => {
  console.log(x)
}, items.updateImage)
app.get('/items/:id/image.png', items.getImage)
app.delete('/items/:id', items.remove)

const server = app.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('*** Listening on port 8080')
})

const io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  items.pipeEvents(socket)
})

// Also spawn chatbot and fetch service (this also be deployed as indepdent proccesses (a. la microservices))
require('../chatbot/bot')
webFetcher.initialize()
items.initialize()

exports.app = app
