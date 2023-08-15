const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
    name: {type: String, required: true},
    msg: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    date: {type: Date, default: Date.now},
})

module.exports = model('Message', MessageSchema)