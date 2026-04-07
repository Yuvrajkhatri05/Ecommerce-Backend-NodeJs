const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentController");

router.post("/payment", paymentController.createPayment);
/**
 * @swagger
 * /payment/payment:
 *   post:
 *     summary: Create Razorpay payment order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 500
 *     responses:
 *       200:
 *         description: Payment order created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "order_id"
 *               amount: 50000
 *               currency: "INR"
 */

router.post("/verify", paymentController.verifyPayment);
/**
 * @swagger
 * /payment/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             razorpay_order_id: "order_id"
 *             razorpay_payment_id: "payment_id"
 *             razorpay_signature: "signature"
 *     responses:
 *       200:
 *         description: Payment verification result
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Payment verified successfully"
 */

module.exports = router;