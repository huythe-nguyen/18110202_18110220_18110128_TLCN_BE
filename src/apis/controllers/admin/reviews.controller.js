const httpStatus = require('http-status')
const catchAsync = require('../../../utils/catch-async')
const { reviewService } = require('../../services')
const Review = require('../../models/review.model');



const list = catchAsync(async (req, res) => {
    const page = req.query.page
    const size = req.query.size
    const List = await reviewService.list(page,size)
    res.status(httpStatus.OK).json({
        success: true,
        data: List
    });
})
const parinato = catchAsync(async (req, res) => {
    const lengthOrigin = (await Review.find({state: "Chưa trả lời"})).length;
    res.status(httpStatus.OK).json({
        counts: lengthOrigin
    });
})
const review = catchAsync(async (req, res) => {
    const List = await Review.findById(req.params.id)
    res.status(httpStatus.OK).json({
        data: List
    });
})
module.exports = {
    list,
    parinato,
    review
}
