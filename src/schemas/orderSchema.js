const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  paymentMethod: { type: String },
  billingAddress: { type: Schema.Types.ObjectId, ref: 'addresses' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('orders', OrderSchema)