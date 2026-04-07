const express = require("express");
const router = express.Router();
const { userLogout, userSignup, userLogin } = require("../Controllers/authController");

router.post("/login", userLogin);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "yuvraj@gmail.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               token: "jwt_token"
 *               user:
 *                 _id: "user_id"
 *                 name: "Yuvraj"
 *                 email: "yuvraj@gmail.com"
 */

router.post("/signup", userSignup);
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Yuvraj"
 *             email: "yuvraj@gmail.com"
 *             password: "123456"
 *             mobileNo: "9876543210"
 *     responses:
 *       201:
 *         description: User created successfully
 */

router.post("/logout", userLogout);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

module.exports = router;