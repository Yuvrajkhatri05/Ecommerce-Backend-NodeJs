const JWT = require("jsonwebtoken");

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        mobileNo: user.mobileNo,
        fullName: user.fullName,
        address: user.address,
    };
    const token = JWT.sign(payload, process.env.SECRET);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, process.env.SECRET);
    return payload;
}

function createTokenForSeller(seller) {
    const Spayload = {
        _id: seller._id,
        email: seller.email,
        mobileNo: seller.mobileNo,
        sellerName: seller.sellerName,
        firmName: seller.firmName,
        address: seller.address,
    };
    const token = JWT.sign(Spayload, process.env.SECRET);
    return token;
}
function validateSellerToken(token) {
    const Spayload = JWT.verify(token, process.env.SECRET);
    return Spayload;
}

module.exports = {
    createTokenForUser,
    validateToken,
    createTokenForSeller,
    validateSellerToken,
}