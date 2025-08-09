const { Router } = require("express")
const { authMiddleware } = require("../midlleware/authMiddleware")

const router = Router()

router.get("/todos", () => { })
router.post("/todos", () => { })
router.patch("/todos/:id", () => { })
router.delete("/todos/:id", () => { })

module.exports = router