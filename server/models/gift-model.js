const { Schema, model } = require("mongoose");

const GiftSchema = new Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = model("Gift", GiftSchema);
