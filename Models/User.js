const bcrypt = require("bcrypt");
const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    fullName: String,
    password: String,
    mobileNo: String,
    email:{
        type: String,
        unique: true,
    },
    address: [
        {
            line: String,
            nearBy: String,
            city: String,
            code: Number,
            state: String,
            country: {
                type: String,
                default: "India",
            }
        }
    ],
    cart: [
        {
            product: {
                type:mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    currentOrderObj: {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                quantity: Number,
                variant: {
                    size: String,
                    price: Number,
                    discount: Number,
                    finalPrice: Number
                }
            }
        ],
        totalAmount: {
            type: Number,
            default: 0
        }
    },
    myOrders: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "order",
        }
    ]
},{timestamps: true}
);
userSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified("password")) return next();
    const hashed = await bcrypt.hash(user.password, 10);
    this.password = hashed;
    next();
});
const User = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = User;