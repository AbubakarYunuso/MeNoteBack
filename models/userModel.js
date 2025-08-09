const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  name: { type: String, required: true },
  data: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String
})

const userModal = model("User", userSchema)

module.exports = userModal