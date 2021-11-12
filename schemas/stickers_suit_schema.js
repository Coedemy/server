const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StickersSuitSchema = new Schema({
    suitName: { type: String, trim: true },
    stickers: [{ type: String }]
}, { timestamps: true })

const StickersSuit = mongoose.model('StickersSuit', StickersSuitSchema)
module.exports = StickersSuit