const Socket = require('../models/socket')
const Group = require('../models/group')

exports.findAll = (req, res) => {
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
  const socket = new Socket({
    name: 'Kitchen Stove',
    status: false,
    image: 'stove.jpg',
    colour: 'red'
  })

  socket.save(function (err) {
    if (err) return console.log(err.stack)
    console.log('Kitchen Stove is added')
    res.json('Kitchen Stove added')
  })
}

exports.create2 = (req, res) => {
  const socket = new Socket({
    name: 'Toaster',
    status: false,
    image: 'toaster.jpg',
    colour: 'green'
  })

  socket.save(function (err) {
    if (err) return console.log(err.stack)
    console.log('Toaster is added')
    res.json('Toaster added')
  })
}

function findGroupId (Name) {
  return Group.find({ name: Name })
}

exports.update = (req, res) => {
  const query = findGroupId('Kitchen Group')
  query.exec(function (err, group) {
    if (err) return console.log(err.stack)
    console.log(group[0]._id)

    Socket.findOneAndUpdate(
      { name: 'Kitchen Stove' },
      { $push: { groups: group[0]._id } },
      function (err, socket) {
        if (err) return console.log(err.stack)
        res.json(socket)
      }
    )
  })
}

exports.deleteAll = (req, res) => {
  Socket.deleteMany({})
    .then(res.json('deleted'))
}
