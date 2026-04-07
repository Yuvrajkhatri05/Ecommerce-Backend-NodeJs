const User = require("../Models/User");

// VERIFY CONTROLLER
exports.userVerify = async(req, res) => {
  if (!req.user || !req.cookies.token) {
    return res.json({ loggedIn: false });
  }
  const user = await User.findById(req.user._id).populate([
    {path: 'cart.product', populate: {path: 'seller', select: 'firmName'}},
    {path: 'currentOrderObj.items.product', populate: {path: 'seller', select: 'firmName'}},
    {path: 'myOrders.order'}
  ]).lean();
  res.json({
    loggedIn: true,
    user
  });
}

// ADD ADDRESS CONTROLLER
exports.addAddress = async (req, res) => {
  try{
    const user = req.user;
    const address = req.body;
    user.address.push({
      line: address.line,
      nearBy: address.nearBy,
      city: address.city,
      code: address.code,
      state: address.state
    });
    await user.save();
    res.status(200).json({ success: true, message: "Address Added successfully"});
  } catch(error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
// DELETE ADDRESS CONTROLLER
exports.deleteAddress = async (req, res) => {
  try{
    const user = req.user;
    const { id } = req.params;
    user.address = user.address.filter(
      item => item._id.toString() !== addressId
    );
    await user.save();
    res.status(200).json({ success: true, message: "Address removed", cart: user.cart});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET CART CONTROLLER
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
        .populate({path: 'cart.product', populate: {path: 'seller', select: 'firmName'}}).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
// REMOVE CART CONTROLLER
exports.removeCartProduct = async (req, res) => {
    try{
        const user = req.user;
        const { productId } = req.params;
        user.cart = user.cart.filter(
          item => item.product.toString() !== productId
        );
        await user.save();
        res.status(200).json({ success: true, message: "Product removed from cart"});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// ADDFORORDER CONTROLLER
exports.addForOrder = async (req, res) => {
  try {
    const user = req.user;
    const addForOrder = req.body;
    const formattedItems = addForOrder.items.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      variant: {
        size: item.variant.size,
        price: item.variant.price,
        discount: item.variant.discount,
        finalPrice: item.variant.finalPrice || item.variant.finalprice
      }
    }));
    await user.updateOne({
      $set: {
        currentOrderObj: {
          items: formattedItems,
          totalAmount: addForOrder.orderTotal
        }
      }
    });
    res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
// CHECKOUT INFO CONTROLLER
exports.checkoutProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("currentOrderObj")
      .populate({path: "currentOrderObj.items.product", populate: {path: 'seller', select: 'firmName'}});
    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// UPDATE CONTROLLER      
// -- ADD TO CART VIA UPDATE ROUTE
exports.update = async (req, res) => {
  try {
    const { action, field, data, match } = req.body;
    let updateQuery = {};
    let matchQuery = { _id: req.user._id };
    switch (action) {

      // UPDATE cart item
      case 'update':
        let setData = {};
        for (let key in data) {
          setData[`${field}.$.${key}`] = data[key];
        }
        matchQuery[`${field}._id`] = match;
        updateQuery = { $set: setData };
      break;
      // ADD item
      case 'add':
        updateQuery = { $push: { [field]: data } };
      break;
      // REMOVE item
      case 'remove':
        updateQuery = { $pull: { [field]: { _id: match } } };
      break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
    const updated = await User.findOneAndUpdate(
      matchQuery,
      updateQuery,
      { new: true, runValidators: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
