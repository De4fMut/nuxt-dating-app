const {Schema, model} = require('mongoose')

const CommunitySchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    name: {type: String, required: true},
    theme: {type: String, required: true},
    logo: {type: String},
    date: {type: Date, default: Date.now},
})

module.exports = model('Community', CommunitySchema)