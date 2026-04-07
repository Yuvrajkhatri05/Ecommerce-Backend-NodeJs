require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const Port = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
// Static Folder (for images)
app.use("/uploads", express.static(path.join(__dirname, "Public/uploads")));

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./Configuration/swagger");
// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error", err));

app.use(cors({
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
}));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// AUTH APIs
app.use("/auth", require("./Routes/authRoutes"));

// USER APIs
app.use("/user", require("./Routes/userRoutes"));

// SELLER APIs
app.use("/seller", require("./Routes/sellerRoutes"));

// PRODUCT APIs
app.use("/product", require("./Routes/productRoutes"));

// ORDER APIs
app.use("/order", require("./Routes/orderRoutes"));

// PAYMENT APIs
app.use("/payment", require("./Routes/paymentRoutes"));


app.listen(Port, () => console.log(`Server Started at PORT:${Port}`));
