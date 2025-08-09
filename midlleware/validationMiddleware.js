const { validationResult } = require("express-validator")

exports.validationMiddleware = function (req, res, next) {
  const validationErrore = validationResult(req)

  if (!validationErrore.isEmpty()) {
    return res.status(400).json(validationErrore.array()[0].msg)
  }

  next()
}