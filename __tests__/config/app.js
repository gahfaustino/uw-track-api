const rfr = require('rfr')
const mongoose = require('mongoose')
const logger = rfr('helpers/logger')

process.env.NODE_ENV = 'development'

const app = require('./server_test')

module.exports = app
