require('dotenv').config()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id
    delete ret.hash
  }
})

module.exports = mongoose.model('User', userSchema)
