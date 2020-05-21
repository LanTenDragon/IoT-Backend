const express = require('express')

module.exports = function (app) {
  app.use(express.static('public'))
  app.use('/scripts', express.static('node_modules/mithril'))
}
