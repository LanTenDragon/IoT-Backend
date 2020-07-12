module.exports = function (app) {
  const stats = require('../controllers/statistics')
  app.route('/statistics/:userid/active')
    .get(stats.getActive)

  app.route('/statistics/:userid/inactive')
    .get(stats.getInactive)

  app.route('/statistics/:userid/total')
    .get(stats.getTotal)

  app.route('/statistics/:userid/unassigned')
    .get(stats.getUnassigned)

  app.route('/statistics/:userid/power')
    .get(stats.getPower)
}
