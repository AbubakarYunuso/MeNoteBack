const { body } = require("express-validator");

exports.todoValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Пустая задача"),
]