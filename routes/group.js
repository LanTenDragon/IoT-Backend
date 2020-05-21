module.exports = function (app) {
  const groups = require('../controllers/group')
  const localpath = '/group/'

  app.get(localpath, groups.findAll)
  app.get(localpath + 'get', groups.findAll)
  app.get(localpath + 'create', groups.create)
  app.get(localpath + 'create2', groups.create2)
  app.get(localpath + 'delete', groups.deleteAll)

  app.use(localpath, function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have day :)")
  })
}
