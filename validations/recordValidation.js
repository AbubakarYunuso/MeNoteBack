const { body } = require("express-validator");

exports.recordValidetion = [
  body("header").trim()
    .notEmpty().withMessage("Заголовок не должен быть пустой"),
]