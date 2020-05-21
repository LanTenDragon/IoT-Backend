'use strict'

require('dotenv').config()
const port = process.env.PORT || 8080
const MongoURL = process.env.MONGO - URL || 'mongodb://localhost/test'

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose connection successful')
})

require('./routes/group')(app)
require('./routes/socket')(app)
require('./routes/client')(app)

const server = app.listen(port, function () {
  const host = 'localhost'
  const port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
