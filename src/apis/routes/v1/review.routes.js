const express = require('express');
const reviewController = require('../../controllers/client/review.controller');
const {  reviewsController } = require('../../controllers')


//Create router for review
const router = express.Router({ mergeParams: true });

//Routes of reviews
router
    .route('/')
    .post(
        reviewController.setProductUserIds,
        reviewController.createReview,
    );
router.route('/all').get(reviewController.getAllReviews);
router.route('/:idproduct').get(reviewController.getAllReviewsIdProduct)
router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(
        reviewController.updateReview
    )
    .delete(
        reviewController.deleteReview
    );
router.route('/adminreview/:idReview').post(
    reviewController.AddReviewofReview
);
//export for using in app

module.exports = router;
