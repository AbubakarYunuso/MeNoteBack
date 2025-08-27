const { Router } = require("express")
const { authMiddleware } = require("../midlleware/authMiddleware")
const userController = require("../controllers/userController")

const router = Router()

router.patch("/user/name", authMiddleware, userController.updateName)
router.patch("/user/password", authMiddleware, userController.updatePassword)
router.patch("/user/avatar", authMiddleware, userController.addAndupdateAvatar)
router.delete("/user/avatar", authMiddleware, userController.removeAvatar)
router.delete("/user", authMiddleware, userController.deleteAccount)

module.exports = router