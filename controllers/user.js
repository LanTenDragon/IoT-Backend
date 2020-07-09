const User = require('../models/users')
const Socket = require('../models/socket')
const Group = require('../models/group')
const Logger = require('../logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) { res.send({ message: 'Username already taken!' }) } else {
        const newUser = new User({
          username: req.body.username,
          hash: bcrypt.hashSync(req.body.password, 8)
        })

        const LivingRoomGroup = new Group({
          name: 'Living Group',
          status: false,
          colour: 'red',
          belongsTo: newUser._id
        })

        const KitchenGroup = new Group({
          name: 'Kitchen Group',
          status: false,
          colour: 'yellow',
          belongsTo: newUser._id
        })

        const LivingHiPower = new Socket({
          name: 'Living Room High Power Test Socket',
          status: 'false',
          colour: 'red',
          groups: [LivingRoomGroup._id],
          belongsTo: newUser._id
        })

        const LivingLowPower = new Socket({
          name: 'Living Room Low Power Test Socket',
          status: 'false',
          colour: 'red',
          groups: [LivingRoomGroup._id],
          belongsTo: newUser._id
        })

        const KitchenHiPower = new Socket({
          name: 'Kitchen High Power Test Socket',
          status: 'false',
          colour: 'red',
          groups: [LivingRoomGroup._id],
          belongsTo: newUser._id
        })

        const KitchenLowPower = new Socket({
          name: 'Kitchen Low Power Test Socket',
          status: 'false',
          colour: 'red',
          groups: [LivingRoomGroup._id],
          belongsTo: newUser._id
        })

        res.status(200).json([KitchenGroup, LivingRoomGroup, LivingHiPower, LivingLowPower])

        newUser.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            return Logger(err.stack)
          }
        })

        LivingRoomGroup.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        KitchenGroup.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        LivingHiPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        LivingLowPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        KitchenHiPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        KitchenLowPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        res.status(200).send({ message: 'Registration Successful' })
      }
    })
}

exports.logIn = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) { return res.status(400).send({ accessToken: null, message: 'User does not exist!' }) }

      const passwordMatches = bcrypt.compareSync(req.body.password, user.hash)

      if (!passwordMatches) {
        return res.status(400).send({
          accessToken: null,
          message: 'Incorrect Password!'
        })
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400
      })

      res.json({
        id: user._id,
        username: user.username,
        accessToken: token
      })
    })
}
