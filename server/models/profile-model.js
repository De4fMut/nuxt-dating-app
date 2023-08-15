const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  gender: { type: String, required: true },
  targetGender: { type: String, required: true },
  purpose: { type: String },
  targetHeight: { type: String },
  targetWeight: { type: String },
  // name: { type: String, required: true },
  birthDay: {
    type: Date,
    min: "1940-01-01",
    max: "2005-08-23",
    required: true,
  },
  receivedGifts: [{ 
    type: Schema.Types.ObjectId, ref: "Gift" 
  }],
});

module.exports = model("Profile", ProfileSchema);
