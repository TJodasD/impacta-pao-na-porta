const router = require("express").Router()
const { createNewUser, getUserInfo } = require("../controllers/userController.js")
const { getProducts, createNewOrder, getOrdersByUserId, cancelOrder, rateOrder } = require("../controllers/ordersController.js")

router.post("/newUser", createNewUser)
router.post("/getUserInfo", getUserInfo)
router.post("/newOrder", createNewOrder)
router.get("/getProducts", getProducts)
router.post("/getOrders", getOrdersByUserId)
router.post("/cancelOrder", cancelOrder)
router.post("/rateOrder", rateOrder);


module.exports = router