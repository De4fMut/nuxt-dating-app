const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  theme: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
});

module.exports = model("Post", PostSchema);
