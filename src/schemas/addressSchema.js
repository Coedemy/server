const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AddressSchema = new Schema({
  addressDetail: { type: String },
  state: { type: String },
  city: { type: String },
  country: { type: String },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  }})

module.exports = mongoose.model('addresses', AddressSchema)