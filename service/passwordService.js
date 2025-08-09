const bcrypt = require("bcrypt")

class PasswordService {
  hash(password) {
    const salt = bcrypt.genSaltSync(5)
    const hashPassword = bcrypt.hashSync(password, salt)

    return hashPassword
  }

  verify(password, hashPassword,) {
    const isValidPassword = bcrypt.compareSync(password, hashPassword)

    return isValidPassword
  }
}

module.exports = new PasswordService()