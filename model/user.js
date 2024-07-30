const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "user's name is needed "],
    },
    email: {
        type: String,
        required: [true, "user's name is needed "],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"

    },
    password: {
        type: String,
        required: [true, "password is needed "],
        minLength: [8, "password must contain atleast 8 characters"],
        select: false
    },
    courseEnrolled:{
        enrolled:[{
            name:String,
            image:String,
            id:String

        }],
        final_project:String
    },
   
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordExpiresIn: Date,
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next()

})


userSchema.methods.checkPassword = async function (enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword)
}


userSchema.methods.createResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.passwordExpiresIn= Date.now() +10*60*1000
    return resetToken;

}




exports.User = mongoose.model("User", userSchema);