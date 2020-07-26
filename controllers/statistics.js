const Logger = require('../logger')
const Socket = require('../models/socket')
const Power = require('../models/power')
const m = require('mongoose')

exports.getActive = (req, res) => {
  Socket.countDocuments({ belongsTo: req.params.userid, status: true })
    .then(count => {
      Logger(count)
      res.json(count)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.getInactive = (req, res) => {
  Socket.countDocuments({ belongsTo: req.params.userid, status: false })
    .then(count => {
      Logger(count)
      res.json(count)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.getTotal = (req, res) => {
  Socket.countDocuments({ belongsTo: req.params.userid })
    .then(count => {
      Logger(count)
      res.json(count)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.getUnassigned = (req, res) => {
  Socket.countDocuments({ belongsTo: req.params.userid, groups: { $eq: [] } })
    .then(count => {
      Logger(count)
      res.json(count)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.getPower = (req, res) => {
  const date = new Date()
  date.setDate(date.getDate() - req.body.days)
  date.setHours(date.getHours() + 8)
  Logger("Yesterday's date: " + date.toISOString())

  Socket.find({ belongsTo: req.params.userid } /* { status: 0, image: 0, groups: 0, name: 0, belongsTo: 0, colour: 0, __v: 0 } */)
    .then(SocketResult => {
      const ids = SocketResult.map(item => {
        return m.Types.ObjectId(item._id)
      })

      Power.aggregate(
        [
          { $match: { belongsTo: { $in: ids }, timestamp: { $gt: date } } },
          { $group: { _id: '$belongsTo', total: { $sum: { $add: ['$amount'] } } } },
          { $sort: { total: -1 } }
        ])
        .then(PowerResult => {
          PowerResult.map(item => {
            const socketitem = SocketResult.filter(item2 => {
              const sock = new Socket(item2)
              return sock._id.toString() === item._id.toString()
            })
            const temp = JSON.parse(JSON.stringify(socketitem))
            item.name = temp[0].name
          })
          res.json(PowerResult)
        })
    })
}
