const { Schema, model, default: mongoose } = require("mongoose");

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
  productQuantity: Number,
  productPrice: Number,
  productSize: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller"
  }
});

const orderSchema = new Schema({
  Name: String,
  Address: String,
  MobileNo: String,
  EmailId: String,
  items: [orderItemSchema],
  paymentMethod: String,
  paymentId: String,
  orderPrice: Number,
  orderStatus: {
    type: String,
    default: "PLACED"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = model("order", orderSchema);

module.exports = Order;
