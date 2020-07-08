'use strict'

require('dotenv').config({ path: '.env.' + process.env.NODE_ENV })
require('./controllers/mqtt')

const port = process.env.PORT || 3001
const MongoURL = process.env.MONGODB || 'mongodb://localhost/test'
const corsOption = { origin: '*' }

const Logger = require('./logger')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(cors(corsOption))
app.use(bodyParser.json())

mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  Logger('Mongoose connection successful')
})

require('./routes/group')(app)
require('./routes/socket')(app)
require('./routes/client')(app)
require('./routes/user')(app)

const server = app.listen(port, function () {
  const host = 'localhost'
  const port = server.address().port

  Logger('App listening at http://' + host + ':' + port)
})
