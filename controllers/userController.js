const fileService = require("../service/fileService")
const passwordService = require("../service/passwordService")
const userService = require("../service/userService")

class UserController {

  async updateName(req, res) {
    try {
      const { name } = req.body
      const user = await userService.update(req.user.id, { name })

      res.json({ ...req.user, name: user.name })

    } catch (error) {
      res.status(500).json("Произошли неполядки, повторите попытку позже")
    }
  }

  async updatePassword(req, res) {
    try {
      const { password, newPassword } = req.body

      const user = await userService.searchById(req.user.id)

      const isValidPassword = passwordService.verify(password, user.password)
      const isNotCopyPassword = passwordService.verify(newPassword, user.password)

      if (!isValidPassword) return res.status(403).json("Неверный пароль")

      if (isNotCopyPassword) return res.status(400).json("Пароли не должны быть схожие")

      const hashPassword = passwordService.hash(newPassword)

      await userService.update(req.user.id, { password: hashPassword })

      res.json("Пароль изменён")
    } catch (error) {
      res.status(500).json("Произошли неполядки, повторите попытку позже")
    }
  }

  async addAndupdateAvatar(req, res) {
    try {
      const user = await userService.searchById(req.user.id)

      if (!req.files || !req.files.avatar) {
        return res.status(400).json("Файл аватара не найден")
      }

      const fileName = fileService.addImage(req.files.avatar)
      const updatedUser = await userService.update(req.user.id, { avatar: fileName })

      if (user.avatar !== process.env.NO_AVATAR) {
        fileService.deleteImage(user.avatar)
      }

      res.json({ ...req.user, avatar: updatedUser.avatar })

    } catch (error) {
      res.status(500).json("Ошибка при обновлении аватара")
    }
  }

  async removeAvatar(req, res) {
    try {
      const user = await userService.searchById(req.user.id)

      if (user.avatar === process.env.NO_AVATAR) {
        return res.status(400).json("Аватар уже удалён")
      }

      const removeAvatar = fileService.deleteImage(user.avatar)
      const updateUser = await userService.update(req.user.id, { avatar: removeAvatar })

      res.json({ ...req.user, avatar: updateUser.avatar })

    } catch (error) {
      res.status(500).json("Ошибка при удалении аватара")
    }
  }

  async deleteAccount(req, res) {
    try {

      const user = await userService.delete(req.user.id)

      if (user.avatar !== process.env.NO_AVATAR) {
        fileService.deleteImage(user.avatar)
      }

      res.json("Пользователь удален")

    } catch (error) {
      res.status(500).json("Ошибка при удалении пользователя")
    }
  }

}

module.exports = new UserController()