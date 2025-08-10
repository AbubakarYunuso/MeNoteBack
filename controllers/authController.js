const authService = require("../service/authService")
const fileService = require("../service/fileService")
const passwordService = require("../service/passwordService")
const userService = require("../service/userService")


class authController {
  async regist(req, res) {
    try {
      const { login, password } = req.body

      const isRegistUser = await userService.searchByLogin(login)

      if (isRegistUser) return res.status(409).json("Пользователь уже существует")

      const avatarImageName =
        (req.files && req.files.avatar) ?
          fileService.addImage(req.files.avatar) :
          process.env.NO_AVATAR

      const hashPassword = passwordService.hash(password)

      const newUser = await userService.create({ ...req.body, avatar: avatarImageName, password: hashPassword })

      res.json(newUser)
    } catch (error) {
      res.status(500).json("Не удалось загестрироваться, повторите попытку позже")
    }


  }

  async authorization(req, res) {

    try {
      const { login, password } = req.body

      const user = await userService.searchByLogin(login)


      if (!user) return res.status(401).json("Неверный логин или пароль")

      const isValidPassword = passwordService.verify(password, user.password)

      if (!isValidPassword) return res.status(401).json("Неверный логин или пароль")

      const { name, data, avatar, _id } = user

      const token = authService.createToken({ id: _id, name, data, avatar }, process.env.SECRET_KEY, "1h")

      res.json({ token })
    } catch (error) {
      res.status(500).json("Не удалось авторизоваться, повторите попытку позже")
    }

  }
}

module.exports = new authController()