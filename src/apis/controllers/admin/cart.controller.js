const httpStatus = require('http-status')
const catchAsync = require('../../../utils/catch-async')
const { cartService } = require('../../services')
const { Cart } = require('../../models')


const list = catchAsync(async (req, res, next) => {
    const page = req.query.page
    const size = req.query.size
    const key = new RegExp(req.params.key)
    const List = await cartService.list(page,size,key)
    res.status(httpStatus.OK).json({
        success: true,
        cart: List
    });
})
const parinato = catchAsync(async (req, res) => {
    const lengthOrigin = (await Cart.find({state: 'confimed'})).length;
    res.status(httpStatus.OK).json({
        counts: lengthOrigin
    });
})
const search = catchAsync(async (req, res, next) => {
    const key =req.params.key
    const size = req.query.size
    const list = await cartService.search(key,size)
    res.status(httpStatus.OK).json({
        success: true,
        cart: list
    });
})
const view = catchAsync(async (req, res, next) => {
    const cart = await Cart.findById(req.params.id)

        if(!cart){
            return res.status(500).json({
                success: false,
                message: 'No cart existed'
            });
        }
        res.json({
            success: true,
            cart: cart
        });
})

module.exports = {
    list,
    search,
    view,
    parinato
}
