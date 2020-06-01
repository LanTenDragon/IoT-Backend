module.exports = function (app) {
  const groups = require('../controllers/group')
  app.route('/groups')
    .get(groups.getAll)
    .post(groups.create)

  app.route('/groups/:groupId')
    .get(groups.getById)
    .put(groups.update)
    .delete(groups.delete)
}
