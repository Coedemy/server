const { StickersSuit } = require("../schemas")

const createStickersSuit = async (req, res, next) => {
  const suitName = "Ami bụng bự"
  const stickers = []
  const from = 43516,
    to = 43531
  for (let i = from; i <= to; i++) {
    stickers.push(`/sticker-${i}.png`)
  }
  try {
    const new_sticker_suit = await StickersSuit.create({ suitName, stickers })

    res.status(200).json(new_sticker_suit)
  } catch (err) {
    next(err)
  }
}

const getAllStickersSuits = async (req, res, next) => {
  try {
    const stickers_suits = await StickersSuit.find()

    res.status(200).json(stickers_suits)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createStickersSuit,
  getAllStickersSuits,
}
