const { User } = require("../model/user");
const { promisify } = require("util")
const crypto=require("crypto")
const jwt = require("jsonwebtoken");
const sendEmail=require("../utils/email.js");

exports.signup = async (req, res) => {
    try {
        const isUser =await User.findOne({email:req.body.email})
        if(isUser){
            throw new Error("Email already exists")
        }
        if(req.body.password.length<8){
            throw new Error("password must contain atleast 8 characters")

        }
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

        res
            .status(200)
            .json({
                status: "success",
                token,
                data: newUser
            })

    } catch (error) {
        console.log(error)
        res
            .status(400)
            .json({
                status: "fail",
                message: error
            })
    }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("email or password is empty")

        }
        const user = await User.findOne({ email }).select("+password");

        if (!user || !await user.checkPassword(password, user.password)) {
            throw new Error("Invalid username or password")

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
        res
            .status(201)
            .json({
                status: "success",
                token
            })


    } catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }
}

exports.authenticate = async (req, res, next) => {

    try {
        let token;

            
        if (req.headers.authorization && req.headers.authorization.includes("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new Error("You are not logged in ");
        }


        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const currentUser = await User.findById(decoded.id)

        if (!currentUser) {
            throw new Error("user no longer exist ");
        }



        req.user = currentUser
        next()

    } catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }


}


exports.accesspermission = (role) => {
    return (req, res, next) => {
        try {
            if (role !== req.user.role) {
                throw new Error("You do not have permission to perform this action")
            }
            next()

        } catch (error) {
            res
                .status(400)
                .json({
                    status: "failed",
                    message: error.message
                })
        }
    }
}


exports.forgotPassword = async (req, res) => {
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("Email does not exist")
        }
        const resetToken=user.createResetToken();

        user.save({validateBeforeSave:false})

        const URL=`http://localhost:3000/reset/${resetToken}`
        await sendEmail({
            email:user.email,
            subject:"link to reset your password",
            text:URL
        })

        res
        .status(200)
        .json({
            status: "success",
            message: "Mail is sent to your email"
        })
    }catch (error) {

        // user.passwordExpiresIn=undefined;
        // user.passwordResetToken=undefined;
        // user.save({validateBeforeSave:false})

        res
        .status(400)
        .json({
            status: "failed",
            message: error.message
        })
    
}}

exports.resetPassword = async (req, res) => {
    try {
     const hashedToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
     const user =await User.findOne({passwordResetToken:hashedToken,passwordExpiresIn:{$gt:Date.now()}})

     
     if(!user){
        throw new Error("token has been expired")
     }

         user.password=req.body.password
         user.passwordExpiresIn=undefined;
         user.passwordResetToken=undefined;
         user.save({validateBeforeSave:false})


         res
         .status(200)
         .json({
             status: "success",
             message:"Password changed successfully"
                     })

    }catch (error) {
        res
        .status(400)
        .json({
            status: "failed",
            message: error.message
        })
    }
}



