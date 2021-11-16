const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CartSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'reviews', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('carts', CartSchema)