const todosService = require("../service/todosService")
const userService = require("../service/userService")


class todoController {

  async getAllUserTodos(req, res) {
    const todos = await todosService.getAll(req.user.id)
    res.json(todos)
  }

  async create(req, res) {
    try {
      const todoBody = { ...req.body, userId: req.user.id }

      const todo = await todosService.create(todoBody)

      res.json(todo)
    } catch (error) {
      res.status(500).json("Произошла ошибка при создании задачи, повторите попытку позже")
    }
  }

  async updateTitle(req, res) {
    try {
      const actualTodo = await todosService.findById(req.params.id)
      if (!actualTodo) {
        return res.status(404).json("Задача не найдена")
      }

      const isValidUser = userService.checkUser(String(actualTodo.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет прав для изменения задачи")


      const { title } = req.body
      const updatedTodo = await todosService.update(req.params.id, { title })

      res.json(updatedTodo)

    } catch (error) {
      res.status(500).json("Произошла ошибка при изменении задачи, повторите попытку позже")
    }
  }

  async updateCompletedStatus(req, res) {

    try {
      const actualTodo = await todosService.findById(req.params.id)
      if (!actualTodo) {
        return res.status(404).json("Задача не найдена")
      }

      const isValidUser = userService.checkUser(String(actualTodo.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет прав для изменения задачи")

      const updatedTodo = await todosService.update(req.params.id, { isCompleted: !actualTodo.isCompleted })
      res.json(updatedTodo)
    } catch (error) {
      res.status(500).json("Произошла ошибка при завершении задачи, повторите попытку позже")
    }
  }

  async updateRepeatStatus(req, res) {
    try {
      const actualTodo = await todosService.findById(req.params.id)
      if (!actualTodo) {
        return res.status(404).json("Задача не найдена")
      }

      const isValidUser = userService.checkUser(String(actualTodo.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет прав для изменения задачи")

      const updatedTodo = await todosService.update(req.params.id, { isOnRepeat: !actualTodo.isOnRepeat })
      res.json(updatedTodo)
    } catch (error) {
      res.status(500).json("Произошла ошибка при изменении задачи, повторите попытку позже")
    }
  }

  async delete(req, res) {
    try {

      const actualTodo = await todosService.findById(req.params.id)
      if (!actualTodo) {
        return res.status(404).json("Задача не найдена")
      }

      const isValidUser = userService.checkUser(String(actualTodo.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет прав для изменения задачи")

      await todosService.delete(req.params.id)

      res.json("Задача удалена")
    } catch (error) {
      res.status(500).json("Произошла ошибка при удалении задачи, повторите попытку позже")
    }
  }

  async deleteNonRepeat() {
    try {
      await todosService.deleteMany({ isOnRepeat: false })
    } catch (error) {
      res.status(500).json("При удалении задач произошла ошибка")
    }
  }

}

module.exports = new todoController()