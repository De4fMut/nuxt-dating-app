const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name:{ type: String, required: true },
  ava:{ type: String},
  messages: [
    {type: Schema.Types.ObjectId,
      ref: "Message",}
    // {
    //   sender: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    //   text: String,
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    // },
  ],
});

module.exports = model("Room", RoomSchema);
