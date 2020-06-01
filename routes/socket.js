module.exports = function (app) {
  const sockets = require('../controllers/socket')
  app.route('/sockets')
    .get(sockets.getAll)
    .post(sockets.create)

  app.route('/sockets/:socketId')
    .get(sockets.getById)
    .put(sockets.update)
    .delete(sockets.delete)
}
