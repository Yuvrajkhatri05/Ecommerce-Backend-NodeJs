const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// PAYMENT CONTROLLER
exports.createPayment = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR"
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
}

// PAYMENT VERIFY CONTROLLER
exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");
  if (razorpay_signature === expectedSign) {
    res.json({
      success: true,
      message: "Payment verified successfully"
    });
  } else {
    res.json({
      success: false,
      message: "Invalid signature"
    });
  }
}