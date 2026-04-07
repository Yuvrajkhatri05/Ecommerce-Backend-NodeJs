const Product = require("../Models/Product");
const Seller = require("../Models/Seller");
const upload = require("../Middlewares/FilesUpload");
const mongoose = require("mongoose");

// GET PRODUCTS BY TYPE CONTROLLER
exports.getProductsByType =  async (req, res) => {
  try {
    const productType = req.params.productType;
    const products = await Product.find({ productType }).populate("seller");
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('BACKEND ERROR 👉', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// GET SINGLE PRODUCT BY ID CONTROLLER
exports.getSingleProduct = async (req, res) => {
  const _id = req.params.productId;
  if(!_id){
    res.status(400).json({ success: false, message: "No Product Id"});
  }
  const products = await Product.find({ _id })
  .populate({path:"seller", select:"firmName"})
  .lean();
  res.json({ success: true, products});
}

// GET RELATED PRODUCTS CONTROLLER
exports.getRelatedProducts = async (req, res) => {
  try {
    const { productType, id } = req.params;
    // Validation
    if (!productType || !id) {
      return res.status(400).json({ success: false, message: 'No product Details',});
    }
    const objectId = new mongoose.Types.ObjectId(id);
    // Fetch related products (same type, exclude clicked product)
    const products = await Product.find({ productType, _id: { $ne: objectId }}).limit(20).populate("seller");
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch related products',
      error: error.message,
    });
  }
}

// UPLOAD NEW PRODUCT FOR SELL BY SELLER CONTROLLER
exports.newProductUplad = upload.array("images", 10), async (req, res) => {
  try {
    const product = req.body;

    // Parse variants safely
        const variants = product.variants ? JSON.parse(product.variants) : [];

    // Cloudinary URLs
    const imagePaths = req.files?.map(file => file.path);

    const newProduct = await Product.create({
      productType: product.productType,
      productName: product.productName,
      brandName: product.brandName,
      productdetails: product.productdetails,
      productcolour: product.productColour,
      productstyle: product.productStyle,
      productmaterial: product.productMaterial,
      productgender: product.productGender,
      productdimensions: product.productDimensions,
      productprice: product.price,
      discount: product.discount,
      discountPrice: product.discountPrice,
      productsize: product.productsize,
      mainImage: imagePaths?.[0], // first image
      images: imagePaths, // all images
      availableProduct: product.availableProduct,
      seller: req.seller?._id,
      variants: variants,
    });

    await Seller.findByIdAndUpdate(
      req.seller._id,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    return res.status(201).json({
      Status: "Success",
      result: true,
      product: newProduct,
    });

  } catch (error) {
    console.error("Product Upload Error:", error);
    return res.status(500).json({
      Status: "Failed",
      message: "Product upload failed",
    });
  }
}
exports.newProductUpload = async (req, res) => {
  try {
    const product = req.body;
    // Get Cloudinary image URLs
    const imageUrls = req.files?.map(file => file.path);

    // Parse variants safely
    const variants = product.variants ? JSON.parse(product.variants) : [];

    const newProduct = await Product.create({
      productType: product.productType,
      productName: product.productName,
      brandName: product.brandName,
      productdetails: product.productdetails,
      productcolour: product.productColour,
      productstyle: product.productStyle,
      productmaterial: product.productMaterial,
      productgender: product.productGender,
      productdimensions: product.productDimensions,
      productprice: product.price,
      discount: product.discount,
      discountPrice: product.discountPrice,
      productsize: product.productsize,
      mainImage: imageUrls?.[0],
      images: imageUrls,
      availableProduct: product.availableProduct,
      seller: req.seller?._id,
      variants: variants,
    });

    // Add product to seller
    await Seller.findByIdAndUpdate(
      req.seller._id,
      { $push: { products: newProduct._id } }
    );

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH AND FILTER API
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, sort } = req.query;

    let query = {};

    // 🔍 Search by name or brand
    if (keyword) {
      query.$or = [
        { productName: { $regex: keyword, $options: "i" } },
        { brandName: { $regex: keyword, $options: "i" } }
      ];
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      query.productprice = {};
      if (minPrice) query.productprice.$gte = Number(minPrice);
      if (maxPrice) query.productprice.$lte = Number(maxPrice);
    }
    // Category filter
    if (req.query.category) {
      query.productType = req.query.category;
    }

    // Gender filter
    if (req.query.gender) {
      query.productgender = req.query.gender;
    }

    // Brand filter
    if (req.query.brand) {
      query.brandName = req.query.brand;
    }

    // 🛒 Fetch products
    let products = await Product.find(query).populate("seller");

    // 🔄 Sorting
    if (sort === "price") {
      products.sort((a, b) => a.productprice - b.productprice);
    } else if (sort === "-price") {
      products.sort((a, b) => b.productprice - a.productprice);
    }

    res.json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};