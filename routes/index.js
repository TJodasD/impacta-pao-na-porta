const router = require("express").Router()
const { createNewUser, getUserInfo } = require("../controllers/userController.js")
const { getProducts, createNewOrder } = require("../controllers/ordersController.js")

router.post("/newUser", createNewUser)
router.post("/getUserInfo", getUserInfo)
router.post("/newOrder", createNewOrder)
router.get("/getProducts", getProducts)

module.exports = router