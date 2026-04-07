const Order = require("../Models/Order");
const Seller = require("../Models/Seller");
const User = require("../Models/User");

// ORDER NOW CONTROLLER
exports.orderNow = async (req, res) => {
  try {
    const order = req.body;
    const items = order.items;

    const newOrder = await Order.create({
      Name: order.Name,
      Address: order.Address,
      MobileNo: order.MobileNo,
      EmailId: order.EmailId,
      paymentMethod: order.PaymentMethod,
      paymentId: order.PaymentId,
      orderPrice: order.orderPrice,
      items
    });

    const sellerIds = [...new Set(items.map(item => item.sellerId))];
    for (const sellerId of sellerIds) {
      await Seller.findByIdAndUpdate(
        sellerId,
        { $addToSet: { orders: newOrder._id } }
      );
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { myOrders: newOrder._id } }
    );

    res.status(201).json({
      Status: "Success",
      result: true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

// GET ORDER CONTROLLER
exports.getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
        .populate({
        path: 'myOrders',
        select: 'items createdAt orderStatus',
        populate: {
          path: 'items.product',
          model: 'product',
          select: 'mainImage productName brandName productcolour productType productstyle productgender',
        }
      }).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}