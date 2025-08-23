const { Schema, model } = require("mongoose")

const RecordSchema = new Schema({
  header: { type: String, required: true },
  title: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
})

const RecordModel = model("Records", RecordSchema)

module.exports = RecordModel