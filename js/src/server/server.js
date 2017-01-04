const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')
const logger = require('winston')
const bodyParser = require('body-parser')

const DB = require('./db')
const ItemsRoutes = require('./routes/items')
const BotsRoutes = require('./routes/bots')
const webFetcher = require('./webFetcher')
const botScheduler = require('../chatbot/botScheduler')

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

app.use(bodyParser.json({ verify: saveRawBody, limit: '50mb' }))
app.use(bodyParser.urlencoded({ verify: saveRawBody, limit: '50mb', extended: true }))
// app.use(bodyParser.raw({ verify: saveRawBody, type: () => true }))

const db = new DB()
const items = new ItemsRoutes(db)
items.mountApp(app)
const bots = new BotsRoutes(db)
bots.mountApp(app)

const server = app.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    logger.error(err)
    return
  }
  logger.info('*** Listening on port 8080')
})

const io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  items.pipeEvents(socket)
  bots.pipeEvents(socket)
})

// Spawn chatbot and website fetch services
// NOTE: these could be deployed as indepdent proccesses
// (a. la microservices) since they use http client
webFetcher.initialize()
botScheduler.initialize()

exports.app = app