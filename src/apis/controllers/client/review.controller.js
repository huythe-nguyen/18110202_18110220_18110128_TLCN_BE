const { object } = require('joi');
const Review = require('../../models/review.model');
const factory = require('./handler.controller');

exports.setProductUserIds = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.params.idUser;
    next();
};

exports.getAllReviews = async (req, res) => {

    try {
        const reviews = await Review.find();

        res.status(200).json({
            'status': 'success',
            data: reviews,
        });
    }
    catch (err) {
        console.log(err);
    }

}
exports.getAllReviewsIdProduct = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.idproduct,
        });
        res.status(200).json({
            'status': 'success',
            data: reviews,
        });
    }
    catch (err) {
        console.log(err);
    }

}

exports.AddReviewofReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.idReview);
        let reviewOfAdmin = "";
        console.log("res", req.body);
        if (review.rating >= 3) {
            if (!req.body.adminReview) {
                req.body.adminReview = "Cảm ơn bạn đã đánh giá"
                reviewOfAdmin = req.body.adminReview;
            }
            else {
                reviewOfAdmin = req.body.adminReview;
            }
        }
        else {
            if (!req.body.adminReview) {
                req.body.adminReview = "Giày đẹp mà còn chê"
                reviewOfAdmin = req.body.adminReview;
            }
        }
        review.adminReview = reviewOfAdmin;
        review.state = "Đã trả lời"
        await review.save();
        res.status(200).json({
            'status': 'success',
            data: review,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getAllReviewState = async (req, res) => {
    try {
        const reviews = await Review.find({
            state: "Chưa trả lời"});
        res.status(200).json({
            status: 'success',
            data: reviews,
        });
    }
    catch (err) {
        console.log(err);
    }
}


exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
