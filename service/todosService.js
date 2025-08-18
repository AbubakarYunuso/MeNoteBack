const TodoModel = require("../models/todoModel");

class todosService {

  async findById(todoId) {
    const todo = await TodoModel.findById(todoId)
    return todo
  }

  async getAll(userId) {
    const todos = await TodoModel.find({ userId })
    return todos
  }

  async create(todoInfo) {
    const todo = await TodoModel.create(todoInfo)
    return todo
  }

  async update(todoId, todoInfo) {
    const todo = await TodoModel.findByIdAndUpdate(todoId, todoInfo, { new: true })
    return todo
  }

  async delete(todoId) {
    const todo = await TodoModel.findByIdAndDelete(todoId, { new: true })
    return todo
  }

  async deleteMany(deleteInfo) {
    const todo = await TodoModel.deleteMany(deleteInfo)
    return todo
  }
}

module.exports = new todosService()

