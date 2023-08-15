const {Schema, model} = require('mongoose')

const WishSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wizard: { type: Schema.Types.ObjectId, ref: "User" },
    wish:{ type: String, required: true},
    isActive: { type: Boolean, default: false }
})

module.exports = model('Wish', WishSchema)