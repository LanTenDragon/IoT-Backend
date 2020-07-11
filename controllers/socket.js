const Socket = require('../models/socket')
const Logger = require('../logger')
const mqtt = require('mqtt')
const MqttClient = mqtt.connect('mqtt://localhost:1883')

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
  Socket.findById(req.params.socketId, function (err, task) {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.getByUserId = (req, res) => {
  Socket.find({ belongsTo: req.params.userId }, function (err, task) {
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
  }, function (err) {
    if (err) { res.send(err) }
    res.json({ message: 'Socket successfully deleted' })
  })
}

exports.getState = function (req, res) {
  Socket.findById(req.params.socketId, function (err, task) {
    if (err) { res.send(err) }
    res.json({ status: task.status })
  })
}

exports.updateState = function (req, res) {
  const stateObject = { status: false }
  if (req.body.socketState === 'on') { stateObject.status = true }

  Socket.findOneAndUpdate(
    { _id: req.params.socketId }, stateObject, { new: true }, function (err, task) {
      if (err) { res.send(err) }
      const topic = 'socket/' + req.body.userid + '/' + task._id + '/state'
      const payload = req.body.socketState
      Logger(topic.toString() + ' ' + payload.toString())
      MqttClient.publish(topic, payload, { retain: true }, function (err) {
        if (err) { res.json(err) }
        Socket.find({ belongsTo: req.body.userid })
          .then(socket => {
            res.json(socket)
          }).catch(err => {
            res.status(500).send({
              message: err.message
            })
          })
      })
    })
}
