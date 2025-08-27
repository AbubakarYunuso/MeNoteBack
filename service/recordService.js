const RecordModel = require("../models/recordModel");

class recordService {
  async findById(recordId) {
    const record = await RecordModel.findById(recordId)
    return record
  }

  async getAll(userId, sorting = "created-first") {

    const sortType = {
      "updated-first": { updatedAt: -1 },
      "updated-last": { updatedAt: 1 },
      "created-first": { createdAt: 1 },
      "created-last": { createdAt: -1 },
    }

    const records = await RecordModel.find({ userId }).sort(sortType[sorting])
    return records
  }

  async create(recordInfo) {
    const record = await RecordModel.create(recordInfo)
    return record
  }

  async update(recordId, newInfo) {
    const record = await RecordModel.findByIdAndUpdate(
      recordId,
      { ...newInfo, updatedAt: Date.now() },
      { new: true })
    return record
  }

  async delete(recordId) {
    const record = await RecordModel.findByIdAndDelete(recordId, { new: true })
    return record
  }

  async findByHeader(userId, header) {

    const searchRegex = new RegExp(header, 'i');

    const record = await RecordModel.find({ userId, header: searchRegex })
    return record
  }
}

module.exports = new recordService