const userModel = require("../models/userModel.js")

class userService {
  async create(userInfo) {
    const user = await userModel.create(userInfo)
    return user
  }

  async searchByLogin(login) {
    const user = await userModel.findOne({ login })
    return user
  }

  async searchById(id) {
    const user = await userModel.findById(id)
    return user
  }

  async update(userId, newUserInfo) {
    const user = await userModel.findByIdAndUpdate(
      userId,
      newUserInfo,
      { new: true }
    )

    return user
  }

  async delete(id) {
    const user = await userModel.findByIdAndDelete(id, { new: true })
    return user
  }

  checkUser(needId, checkUserId) {
    return needId === checkUserId
  }

}

module.exports = new userService()