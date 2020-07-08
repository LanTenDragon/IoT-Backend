const mongoose = require('mongoose')
const Schema = mongoose.Schema

const socketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  image: {
    type: String,
    default: 'power-symbol.jpg'
  },
  colour: {
    type: String,
    required: true
  },
  groups: [{ type: Schema.Types.ObjectId, ref: 'group' }],
  belongsTo: { type: Schema.Types.ObjectId, ref: 'users' }
})

module.exports = mongoose.model('Socket', socketSchema)
