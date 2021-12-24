const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')

const { findDuplicateItems } = require('../utils/array')

const UserSchema = new Schema({
  firstName: { type: String, require, trim: true },
  username: { type: String, require, trim: true },
  lastName: { type: String, require, trim: true },
  headline: { type: String },
  language: { type: String },
  facebook: { type: String },
  youtube: { type: String },
  bio: { type: String },
  joinedDate: { type: Date, default: new Date(1, 1, 2020) },
  profilePicture: { type: Schema.Types.ObjectId, ref: 'images' },
  authMethod: { type: String, default: 'JWT' },
  fbId: { type: String },
  email: { type: String, trim: true, unique: true },
  password: { type: String },
  myLearning: [{ type: Schema.Types.ObjectId, ref: 'courses', default: [] }],
  myTeaching: [{ type: Schema.Types.ObjectId, ref: 'courses', default: [] }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'courses', default: [] }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'courses', default: [] }]
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.password
      delete obj.authMethod
      delete obj.__v
      return obj
    }
  }
})

UserSchema.plugin(findOrCreate)

UserSchema.pre(
  'save',
  async function (next) {
    const { authMethod } = this
    if (authMethod !== 'JWT') next()
    next()
  }
)

UserSchema.post(
  'findOneAndUpdate',
  async function (data) {
    if (data.cart) {
      const cartItemsSet = [...new Set(data.cart)]
      data.cart = cartItemsSet
    }
    if (data.myLearning) {
      const myLearningSet = [...new Set(data.myLearning)]
      data.myLearning = myLearningSet
    }
    if (data.wishlist) {
      const duplicateCoursesId = findDuplicateItems(data.wishlist.map(course => course._id))
      data.wishlist = data.wishlist.filter(course => !duplicateCoursesId.includes(course._id))
    }
    data.save()
  }
)

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  if (user.authMethod !== 'JWT') return true
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

const User = mongoose.model('users', UserSchema)
module.exports = User