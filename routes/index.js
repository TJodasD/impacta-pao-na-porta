const router = require("express").Router()
const userController = require("../controllers/userController.js")

router.post("/newUser", userController)

module.exports = router