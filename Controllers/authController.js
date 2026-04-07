const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../Services/JWTgenerate");

  //  USER LOGOUT ROUTER
exports.userLogout = (req, res) => {
        res.clearCookie("token", {
        httpOnly: true,
        secure: false,   // true only if https
        sameSite: "lax"
    });
        res.json({message: "logout successfully"});
}

  //  USER SIGNUP ROUTER
exports.userSignup = async(req, res) => {
    const user = req.body;
    const newUser = await User.create({
    fullName: user.fullName,
    password: user.password,
    mobileNo: user.mobileNo,
    email: user.email,
   });
   return res.status(201).json({
        Status: "Success",
        result: true,
    });
}

  //  USER LOGIN ROUTER
exports.userLogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(401).json("User not found");
    }
    try{
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            const userToken = createTokenForUser(user);
            return res.cookie("token", userToken,{
                  httpOnly: true,      // JS cannot steal cookie
                  secure: false,       // true if using HTTPS
                  sameSite: "strict",
                  maxAge: 24 * 60 * 60 * 1000 
            }).json({ 
                message: "Loging Success",
                result: true,
                user: {
                  _id: user._id,
                  name: user.fullName,
                  email: user.email  
                },
                token: userToken,
            });
        }else {
            return res.json({
                result: false,
                error: "Invalid email or password",
            });
        }
    }catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error",
            result: false,
        });
    }   
}