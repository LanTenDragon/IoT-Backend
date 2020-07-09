const Group = require('../models/group')
const Logger = require('../logger')

exports.getAll = (req, res) => {
  Group.find()
    .then(groups => {
      res.json(groups)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.create = function (req, res) {
  const newGroup = new Group(req.body)
  newGroup.save(function (err) {
    if (err) {
      res.send(err)
      return
    }
    res.json(newGroup)
  })
}

exports.getById = function (req, res) {
  Group.findById(req.params.groupId, function (err, task) {
    if (err) {
      res.send(err)
      return
    }
    res.json(task)
  })
}

exports.getByUserId = function (req, res) {
  Group.find({ belongsTo: req.params.userId }, function (err, task) {
    if (err) {
      res.send(err)
      return
    }
    Logger(task)
    res.json(task)
  })
}

exports.update = function (req, res) {
  Group.findOneAndUpdate(
    { _id: req.params.groupId }, req.body, { new: true }, function (err, task) {
      if (err) {
        res.send(err)
        return
      }
      res.json(task)
    })
}

exports.delete = (req, res) => {
  Group.deleteOne({
    _id: req.params.groupId
  }, function (err, task) {
    if (err) { res.send(err) }
    res.json({ message: 'Group successfully deleted' })
  })
}
