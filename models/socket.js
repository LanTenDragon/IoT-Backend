const mongoose = require('mongoose')
const Schema = mongoose.Schema

const socketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  colour: {
    type: String,
    required: true
  },
  groups: [{ type: Schema.Types.ObjectId, ref: 'group' }]
})

module.exports = mongoose.model('Socket', socketSchema)
