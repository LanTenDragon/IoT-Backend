const User = require('../models/users')
const Logger = require('../logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) { res.send({ message: 'Username already taken!' }) } else {
        const userDetails = {
          name: req.body.username,
          hash: bcrypt.hashSync(req.body.password, 8)
        }
        const newUser = new User(userDetails)
        newUser.save(function (err) {
          if (err) return Logger(err.stack)
          res.status(200).send({ message: 'Registration Successful' })
        })
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
