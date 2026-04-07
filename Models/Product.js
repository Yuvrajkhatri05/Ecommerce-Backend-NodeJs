const { Schema, model } = require("mongoose");

const variantSchema = new Schema({
  size: String,
  price: Number,
  discount: Number,
  finalPrice: Number,
  stock: Number,
});

const productSchema = new Schema({
    productType: String,
    productName: String,
    brandName: String,
    productdetails: String,
    productcolour: String,
    productstyle: String,
    productmaterial: String,
    productgender: String,
    dimensions: String,
    productprice: String,
    mainImage: String,
    images: [String],
    seller:{
        type: Schema.Types.ObjectId,
        ref: "seller",
    },
    variants: [variantSchema],
},{timestamps: true}
);
const Product = model("product", productSchema);

module.exports = Product;

