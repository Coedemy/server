const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CartSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'reviews', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  }
})

module.exports = mongoose.model('carts', CartSchema)