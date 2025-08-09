const { body } = require("express-validator");

exports.regisValidation = [
  body("login")
    .trim()
    .isLength({ min: 6, max: 25 }).withMessage("Логин должен быть больше 3 символов")
    .matches(/^\S+$/).withMessage("Логин не должен содержать пробелы"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 25 }).withMessage("Пароль должен быть от 6 до 20 символов")
    .matches(/^\S+$/).withMessage("Пароль не должен содержать пробелы")
    .matches(/\d/).withMessage("Пароль должен содержать цифру")
    .matches(/[A-Za-z]/).withMessage("Пароль должен содержать буквы")
    .matches(/[A-Z]/).withMessage("Пароль должен содержать хотя бы одну заглавную букву")
];

exports.authorizationValidation = [
  body("login").trim().notEmpty().withMessage("Логин обязателен"),
  body("password").trim().notEmpty().withMessage("Пароль обязателен"),
];