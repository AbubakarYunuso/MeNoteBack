const { Router } = require("express")
const { authMiddleware } = require("../midlleware/authMiddleware")
const recordController = require("../controllers/recordController")
const { validationMiddleware } = require("../midlleware/validationMiddleware")
const { recordValidetion } = require("../validations/recordValidation")


const router = Router()

router.get("/records",
  authMiddleware, recordController.getAll)
router.get("/records/:id",
  authMiddleware, recordController.getOne)
router.post("/records",
  authMiddleware, recordValidetion, validationMiddleware, recordController.create)
router.patch("/records/:id",
  authMiddleware, recordValidetion, validationMiddleware, recordController.update)
router.delete("/records/:id", authMiddleware, recordController.delete)

module.exports = router