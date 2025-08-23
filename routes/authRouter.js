const { Router } = require('express')
const authController = require("../controllers/authController.js")
const { regisValidation, authorizationValidation } = require('../validations/authValidation.js')
const { validationMiddleware } = require("../midlleware/validationMiddleware.js")
const router = Router()

router.post("/regist",
  regisValidation, validationMiddleware, authController.regist)
router.post("/auth",
  authorizationValidation, validationMiddleware, authController.authorization)

module.exports = router