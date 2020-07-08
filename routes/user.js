module.exports = function (app) {
  const users = require('../controllers/user')
  app.route('/register')
    .post(users.register)

  app.route('/login')
    .post(users.logIn)
}
