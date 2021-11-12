const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema({
  username: { type: String, require, trim: true },
  email: { type: String, trim: true, unique: true },
  password: { type: String },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
  joinedDate: { type: Date, default: new Date(1, 1, 2020) },
  avatar: { type: String, default: '' },
  coverPicture: { type: String, default: '' },
  authMethod: { type: String, default: 'JWT' },
  fbId: { type: String }
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

const User = mongoose.model('user', UserSchema)
module.exports = User