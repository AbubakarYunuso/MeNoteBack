const recordService = require("../service/recordService");
const userService = require("../service/userService");

class recordController {

  async getByHeader(req, res) {
    const record = await recordService.findByHeader(req.user.id, req.query.header)
    res.json(record)
  }

  async getOne(req, res) {
    try {
      const records = await recordService.findById(req.params.id)
      if (!records) return res.status(404).json("Заметка отсутсвует")

      const isValidUser = userService.checkUser(String(records.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет доступа к заметке")

      res.json(records)
    } catch (error) {
      res.status(500).json("Произошла ошибка при выводе заметки, повторите попытку позже")
    }
  }

  async getAll(req, res) {
    try {
      const actualRecord = await recordService.getAll(req.user.id, req.query.sort)
      return res.json(actualRecord)
    } catch (error) {
      res.status(500).json("Произошла ошибка при выводе заметок, повторите попытку позже")
    }
  }

  async create(req, res) {
    try {
      const recordInfo = { ...req.body, userId: req.user.id }
      const record = await recordService.create(recordInfo)

      res.json(record)
    } catch (error) {
      res.status(500).json("Произошла ошибка при создании заметки, повторите попытку позже")
    }
  }

  async update(req, res) {
    try {
      const actualRecord = await recordService.findById(req.params.id)
      if (!actualRecord) return res.status(404).json("Заметка отсутсвует")

      const isValidUser = userService.checkUser(String(actualRecord.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет доступа для изменения заметки")

      const recordUpdated = await recordService.update(req.params.id, req.body)
      res.json(recordUpdated)
    } catch (error) {
      res.status(500).json("Произошла ошибка при изменении заметки, повторите попытку позже")
    }
  }

  async delete(req, res) {
    try {
      const actualRecord = await recordService.findById(req.params.id)
      if (!actualRecord) return res.status(404).json("Заметка отсутсвует")

      const isValidUser = userService.checkUser(String(actualRecord.userId), req.user.id)
      if (!isValidUser) return res.status(403).json("Нет доступа для удаления заметки")

      await recordService.delete(req.params.id)
      res.json("Заметка удалена")
    } catch (error) {
      res.status(500).json("Произошла ошибка при удалении заметки, повторите попытку позже")
    }
  }
}

module.exports = new recordController()