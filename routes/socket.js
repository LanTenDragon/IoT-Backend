module.exports = function (app) {
  const sockets = require('../controllers/socket')
  const localpath = '/socket/'

  app.get(localpath, sockets.findAll)
  app.get(localpath + 'get', sockets.findAll)
  app.get(localpath + 'create', sockets.create)
  app.get(localpath + 'create2', sockets.create2)
  app.get(localpath + 'delete', sockets.deleteAll)
  app.get(localpath + 'updateStove', sockets.update)
  app.get(localpath + 'populateandget')

  app.use(localpath, function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have day :)")
  })
}
