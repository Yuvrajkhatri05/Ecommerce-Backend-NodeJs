const express = require("express");
const router = express.Router();
const sellerController = require("../Controllers/sellerController");
const auth = require("../Middlewares/Authentication");

router.post("/signup", sellerController.signup);
/**
 * @swagger
 * /auth/seller/signup:
 *   post:
 *     summary: Seller Signup
 *     tags: [Seller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sellerName: "Yuvraj"
 *             firmName: "YK Store"
 *             email: "seller@gmail.com"
 *             password: "123456"
 *             mobileNo: "9876543210"
 *             address: "Jaipur"
 *             state: "Rajasthan"
 *             accountNo: "1234567890"
 *             branchName: "SBI Jaipur"
 *     responses:
 *       201:
 *         description: Seller registered successfully
 */

router.post("/login", sellerController.login);
/**
 * @swagger
 * /auth/seller/login:
 *   post:
 *     summary: Seller Login
 *     tags: [Seller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "seller@gmail.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               token: "jwt_token"
 *               seller:
 *                 _id: "seller_id"
 *                 sellerName: "Yuvraj"
 *                 firmName: "YK Store"
 */

router.post("/logout", sellerController.logout);
/**
 * @swagger
 * /seller/logout:
 *   post:
 *     summary: Seller Logout
 *     tags: [Seller]
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.get("/verify", auth, sellerController.verify);
/**
 * @swagger
 * /seller/verify:
 *   get:
 *     summary: Verify logged-in seller
 *     tags: [Seller]
 *     responses:
 *       200:
 *         description: Seller verification status
 *         content:
 *           application/json:
 *             example:
 *               loggedIn: true
 *               seller:
 *                 _id: "seller_id"
 *                 sellerName: "Yuvraj"
 *                 firmName: "YK Store"
 *                 email: "seller@gmail.com"
 */

router.get("/products", auth, sellerController.getProducts);
/**
 * @swagger
 * /seller/products:
 *   get:
 *     summary: Get all products of seller
 *     tags: [Seller]
 *     responses:
 *       200:
 *         description: Seller products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               loggedIn: true
 *               seller:
 *                 products: []
 */

router.get("/orders", auth, sellerController.recievedOrders);
/**
 * @swagger
 * /seller/orders:
 *   get:
 *     summary: Get orders received by seller
 *     tags: [Seller]
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               seller:
 *                 orders: []
 */

router.patch("/:id", auth, sellerController.update);
/**
 * @swagger
 * /seller/{id}:
 *   patch:
 *     summary: Update seller details
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             sellerName: "Updated Name"
 *             firmName: "Updated Firm"
 *     responses:
 *       200:
 *         description: Seller updated successfully
 */

module.exports = router;