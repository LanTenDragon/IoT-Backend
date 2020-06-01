const Socket = require('../models/socket')
const Logger = require('../logger')

exports.getAll = (req, res) => {
  Socket.find()
    .then(socket => {
      res.json(socket)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.create = function (req, res) {
  const newSocket = new Socket(req.body)
  newSocket.save(function (err) {
    if (err) return console.log(err.stack)
    Logger('New Group is added')
    res.json(newSocket)
  })
}

exports.getById = function (req, res) {
  Socket.findById(req.params.groupId, function (err, task) {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.update = function (req, res) {
  Socket.findOneAndUpdate(
    { _id: req.params.socketId }, req.body, { new: true }, function (err, task) {
      if (err) { res.send(err) }
      res.json(task)
    })
}

exports.delete = (req, res) => {
  Socket.deleteOne({
    _id: req.params.socketId
  }, function (err, task) {
    if (err) { res.send(err) }
    res.json({ message: 'Socket successfully deleted' })
  })
}
