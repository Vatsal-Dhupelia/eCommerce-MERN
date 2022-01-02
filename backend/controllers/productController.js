const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next)=>{

    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product 
    })
})


//Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage)
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
    })
});

//Update Product - Admin
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});

//Delete Product

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not Found", 404));
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});

// Get Product Details

exports.getProductDetails = catchAsyncErrors (async(req, res, next)=> {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Create New Review or Update the Review

exports.createProductReview = catchAsyncErrors (async(req, res, next)=> {

    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({
        validateBeforeSave: false
    });
    res.status(200).json({
        success: true,
    })
});


// Stopped at 04.01.04
