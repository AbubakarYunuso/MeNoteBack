const { Router } = require("express")
const { authMiddleware } = require("../midlleware/authMiddleware")
const userController = require("../controllers/userController")

const router = Router()

router.patch("/user/:id/name", authMiddleware, userController.updateName)
router.patch("/user/:id/password", authMiddleware, userController.updatePassword)
router.patch("/user/:id/avatar", authMiddleware, userController.addAndupdateAvatar)
router.delete("/user/:id/avatar", authMiddleware, userController.removeAvatar)
router.delete("/user/:id", authMiddleware, userController.deleteAccount)

module.exports = router