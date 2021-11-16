const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AddressSchema = new Schema({
  addressDetail: { type: String },
  state: { type: String },
  city: { type: String },
  country: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('addresses', AddressSchema)