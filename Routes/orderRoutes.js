const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/Authentication");
const orderRoutes = require("../Controllers/orderController");

router.get("/myOrders", auth, orderRoutes.getOrders);
/**
 * @swagger
 * /order/myOrders:
 *   get:
 *     summary: Get all orders of logged-in user
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 myOrders: []
 */

router.post("/order", auth, orderRoutes.orderNow);
/**
 * @swagger
 * /order/order:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Name: "Yuvraj"
 *             Address: "Jaipur, Rajasthan"
 *             MobileNo: "9876543210"
 *             EmailId: "yuvraj@gmail.com"
 *             PaymentMethod: "Online"
 *             PaymentId: "razorpay_payment_id"
 *             orderPrice: 1500
 *             items:
 *               - product: "product_id"
 *                 quantity: 2
 *                 sellerId: "seller_id"
 *     responses:
 *       201:
 *         description: Order placed successfully
 */

module.exports = router;