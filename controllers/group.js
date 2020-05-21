const Group = require('../models/group')

exports.findAll = (req, res) => {
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
  const group = new Group({
    name: 'Kitchen Group',
    status: false,
    image: 'group1.jpg',
    colour: 'black'
  })

  group.save(function (err) {
    if (err) return console.log(err.stack)
    console.log('Kitchen Group is added')
    res.json('Kitchen Group added')
  })
}

exports.create2 = function (req, res) {
  const group = new Group({
    name: 'Living Room',
    status: false,
    image: 'Living Room.jpg',
    colour: 'black'
  })

  group.save(function (err) {
    if (err) return console.log(err.stack)
    console.log('Living Room Group is added')
    res.json('Living Room Group added')
  })
}

exports.deleteAll = (req, res) => {
  Group.deleteMany({})
    .then(res.json('deleted'))
}
