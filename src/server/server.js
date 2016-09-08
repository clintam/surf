const express = require('express')
const items = require('./routes/items')
const bodyParser = require('body-parser')
const app = express()

const path = require('path')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')

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

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/index.html', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

// API
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/items', items.findAll)
app.post('/items', items.add)
app.put('/items/:id', items.update)
app.delete('/items/:id', items.delete)

require('express-ws')(app)
app.ws('/rtm', function (ws, req) {
  ws.send(JSON.stringify({ type: 'hello' }))

  ws.on('message', function (msg) {
    ws.send(msg)
  })

  items.pipeEvents(ws)
})

app.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('*** Listening on port 8080')
})

require('../chatbot/bot.js')

exports.app = app
