const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  paymentMethod: { type: String },
  billingAddress: { type: Schema.Types.ObjectId, ref: 'addresses' },
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

module.exports = mongoose.model('orders', OrderSchema)