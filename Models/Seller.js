const bcrypt = require("bcrypt");
const { Schema, model, default: mongoose } = require("mongoose");

const sellerSchema = new Schema({
    sellerName: String,
    firmName: String,
    password: String,
    mobileNo: String,
    email:{
        type: String,
        unique: true,
    },
    address: String,
    state: String,
    accountNo: String,
    branchName: String,
    role: {
      type: String,
      enum: ["USER", "SELLER"],
      default: "SELLER",
    },
    products: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
    ],
    orders: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "order"
      }
    ]
  },{timestamps: true}
);
sellerSchema.pre("save", async function (next) {
    const seller = this;
    if(!seller.isModified("password")) return next();
    const hashed = await bcrypt.hash(seller.password, 10);
    this.password = hashed;
    next();
});
const Seller = model("seller", sellerSchema);

module.exports = Seller;