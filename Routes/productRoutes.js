const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/Authentication");
const productController = require("../Controllers/productController");

router.get("/:productType/:id", productController.getRelatedProducts);
/**
 * @swagger
 * /product/related/{productType}/{id}:
 *   get:
 *     summary: Get related products by type (excluding current product)
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         description: Product type/category
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Current product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Related products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 5
 *               products: []
 */

router.get("/:productId", productController.getSingleProduct);
/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               product:
 *                 _id: "product_id"
 *                 productName: "T-Shirt"
 *                 price: 999
 *                 seller:
 *                   firmName: "YK Store"
 */

router.get("/:productType", productController.getProductsByType);
/**
 * @swagger
 * /product/{productType}:
 *   get:
 *     summary: Get products by type/category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         description: Product type (e.g. shoes, clothes)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               products: []
 */

router.post("/sell", auth, productController.newProductUplad);
/**
 * @swagger
 * /product/sell:
 *   post:
 *     summary: Upload new product (Seller)
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productType:
 *                 type: string
 *               brandName:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               productDetails:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product uploaded successfully
 */

router.get("/search", productController.searchProducts);
/**
 * @swagger
 * /product/search:
 *   get:
 *     summary: Search and filter products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search by product name or brand
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by price (price or -price)
 *     responses:
 *       200:
 *         description: Filtered products list
 */

module.exports = router;
