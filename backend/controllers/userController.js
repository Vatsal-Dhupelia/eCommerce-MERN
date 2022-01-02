const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is a sample id",
            url: "profilepicUrl"

        }
    });

    sendToken(user, 201, res);
});


// Login User

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{

    const {email, password} = req.body;

    // Checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHander("Please enter email and password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);

})


// Logout User

exports.logout = catchAsyncErrors(async(req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true, 
        message: "Logged Out",
    });
});

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHander("User not Found", 404))
    }

    // Get ResetPassword Token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

    try {
        
        await sendEmail({

            email: user.email,
            subject: `eCart Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })


    } catch (error) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
        return next(new ErrorHander(error.message, 500));
        
    }
})


// Reset Pasword
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {

    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt:Date.now()},
    });

    if(!user){
        return next(new ErrorHander("Reset Password Token is Invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match", 400));
    }

    user.password = req.body.password;
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

// Get User Detail

exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("Old Password is Invalid", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not Match", 400));
    }

    user.password = req.body.newPassword;
    await user.save()
    sendToken(user, 200, res)
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
});