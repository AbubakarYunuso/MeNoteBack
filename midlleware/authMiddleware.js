const jwt = require("jsonwebtoken")
const authService = require("../service/authService")

exports.authMiddleware = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const user = authService.verifyToken(token, process.env.SECRET_KEY)

    const { iat, exp, ...userData } = user

    req.user = userData

    next()
  } catch (error) {
    res.status(401).json("Неверный или просроченный токен")
  }

}



