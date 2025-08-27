const { Schema, model } = require("mongoose")

const TodoSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isOnRepeat: {
    type: Boolean,
    default: false
  }
})

const TodoModel = model("Todos", TodoSchema)

module.exports = TodoModel
