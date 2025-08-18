const { Router } = require("express")
const { authMiddleware } = require("../midlleware/authMiddleware")
const todoController = require("../controllers/todoController")
const { validationMiddleware } = require("../midlleware/validationMiddleware")
const { todoValidation } = require("../validations/todoValidation")

const router = Router()

router.post("/todos",
  authMiddleware, todoValidation, validationMiddleware, todoController.create)
router.patch("/todos/:id/title",
  authMiddleware, todoValidation, validationMiddleware, todoController.updateTitle)
router.patch("/todos/:id/complete",
  authMiddleware, todoController.updateCompletedStatus)
router.patch("/todos/:id/repeat",
  authMiddleware, todoController.updateRepeatStatus)
router.delete("/todos/:id", authMiddleware, todoController.delete)
router.get("/todos", authMiddleware, todoController.getAllUserTodos)

module.exports = router