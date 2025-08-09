const jwt = require("jsonwebtoken")

class AuthServer {
  createToken(payload, secretKey, expiresIn = "1h") {
    return jwt.sign(payload, secretKey, { expiresIn })
  }

  verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey)
  }
}

module.exports = new AuthServer()