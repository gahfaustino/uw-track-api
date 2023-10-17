// Load environment vars and DB
require('dotenv').config()
require('./config/db')

// Import packages
const express = require('express')
const {Server} = require('@tus/server')
const {FileStore} = require('@tus/file-store')
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')
const bodyParser = require('body-parser')
const busboyBodyParser = require('./helpers/body-parser')
const { errorHandler } = require('./helpers/error')
const logger = require('morgan')
const cors = require('cors')
const validator = require('express-validator')
const timeout = require('express-timeout-handler')
const app = express()
const uploadApp = express()
const server = require('./config/server')
const versions = ['v1']

require('./config/template').configure(app)
require('./config/api_error')

global._base = path.join(__dirname, '/')

// // Add the authentication middleware.
// app.use(authenticate({
//   region: 'us-east-2',
//   userPoolId: 'us-east-2_ln45PKOUh',
//   tokenUse: ['id', 'access'],
//   audience: ['https://dev-0w6h4qjzioi3gv0d.us.auth0.com/api/v2/']
// }));

const tuxServer = new Server({
  datastore: new FileStore({path: '/files'}),
})

uploadApp.all('*', tuxServer.handle.bind(tuxServer))

app.use('/upload', uploadApp)

// Middlewares
app.use(timeout.handler({
  timeout: 10000,
  onTimeout: function (_req, res) {
    res.status(503).json({ error: 'timeout' })
  }
}))

if (app.get('env') === 'development') {
  console.log('env', app.get('env'))
  app.use(logger('dev'))
  app.get('/template', (req, res) => {
    res.render(`${req.query.path}`, JSON.parse(req.query.data))
  })
}
app.use(busboyBodyParser())
app.use(bodyParser.json({ limit: '42mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(validator())
app.use(express.static('public'))
 
// Set global response headers
app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

// Apply the routes for each version setted
versions.forEach((version) => {
  const versionRoutes = require('./modules/' + version + '/routes')
  app.use('/api/' + version, versionRoutes)
})

app.get('/', (req, res) => {
  const { version } = require('./package.json')
  res.status(200).json({ version })
})



// // Add the authentication error handler.
// app.use(authenticationError());

// Global error handler
app.use(errorHandler)

// Start server
server.start(app)

module.exports = app
