const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema({
  firstName: { type: String, require, trim: true },
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
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'courses', default: [] }],
  cart: { type: Schema.Types.ObjectId, ref: 'carts' }
}, { timestamps: true })

UserSchema.plugin(findOrCreate)

UserSchema.pre(
  'save',
  async function (next) {
    const { authMethod, password } = this
    if (authMethod !== 'JWT') next()

    const hash = await bcrypt.hash(password, 10)
    this.password = hash
    next()
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