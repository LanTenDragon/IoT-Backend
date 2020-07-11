const User = require('../models/users')
const Socket = require('../models/socket')
const Group = require('../models/group')
const Logger = require('../logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) { res.status(401).send({ message: 'Username already taken!' }) } else {
        const newUser = new User({
          username: req.body.username,
          hash: bcrypt.hashSync(req.body.password, 8)
        })

        const LivingRoomGroup = new Group({
          name: 'Living Group',
          image: 'living-room.jpg',
          status: false,
          colour: 'red',
          belongsTo: newUser._id
        })

        const KitchenGroup = new Group({
          name: 'Kitchen Group',
          image: 'kitchen.jpg',
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

        const Desktop = new Socket({
          name: 'Desktop PC',
          status: 'false',
          image: 'gaming-setup.jpg',
          colour: 'red',
          groups: [LivingRoomGroup._id],
          belongsTo: newUser._id
        })

        const KitchenStove = new Socket({
          name: 'Kitchen Stove',
          status: 'false',
          image: 'stove.jpg',
          colour: 'red',
          groups: [KitchenGroup._id],
          belongsTo: newUser._id
        })

        const KitchenToaster = new Socket({
          name: 'Kitchen Toaster',
          status: 'false',
          image: 'toaster.jpg',
          colour: 'red',
          groups: [KitchenGroup._id],
          belongsTo: newUser._id
        })

        const UngroupedLowPower = new Socket({
          name: 'Ungrouped Low Power Test Socket',
          status: 'false',
          colour: 'red',
          belongsTo: newUser._id
        })

        const UngroupedHighPower = new Socket({
          name: 'Ungrouped High Power Test Socket',
          status: 'false',
          colour: 'red',
          belongsTo: newUser._id
        })

        newUser.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            return Logger(err.stack)
          }
          Logger('saved user')
        })

        LivingRoomGroup.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
          Logger('saved group')
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

        Desktop.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        KitchenStove.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
        })

        KitchenToaster.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
          Logger('saved kitchen low power')
        })

        UngroupedHighPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
          Logger('saved ungrouped high power')
        })

        UngroupedLowPower.save((err) => {
          if (err) {
            res.status(501).message('Internal Server Error')
            Logger(err.stack)
          }
          Logger('saved ungrouped low power')
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
