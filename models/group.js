const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  image: {
    type: String,
    default: 'power-symbol.jpg'
  },
  colour: {
    type: String,
    required: true
  },
  belongsTo: { type: Schema.Types.ObjectId, ref: 'users' }
})

module.exports = mongoose.model('Group', groupSchema)
