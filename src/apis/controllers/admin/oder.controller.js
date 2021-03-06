const httpStatus = require('http-status')
const catchAsync = require('../../../utils/catch-async')
const { oderService } = require('../../services')
const { Cart } = require('../../models')


const add = catchAsync(async (req, res, next) => {
    const oders = await oderService.create(req.body)
    res.status(httpStatus.CREATED).json({
        success: true,
        oder: oders
    });
})
const list = catchAsync(async (req, res, next) => {
    const page = req.query.page
    const size = req.query.size
    const key = req.params.status
    const oderList = await oderService.list(page,size,key)
    res.status(httpStatus.OK).json({
        success: true,
        oder: oderList
    });
})
const viewState = catchAsync(async (req, res, next) => {
    const page = req.query.page
    const size = req.query.size
    const daystart = req.query.daystart
    const dayend = req.query.dayend
    const key = req.params.status
    const oderList = await oderService.viewState(page,size,key,daystart,dayend)
    res.status(httpStatus.OK).json({
        success: true,
        oder: oderList
    });
})
const viewDashboard = catchAsync(async (req, res, next) => {
    const page = req.query.page
    const size = req.query.size
    const day = req.query.day
    const key = req.params.status
    const oderList = await oderService.viewDashboard(page,size,key,day)
    res.status(httpStatus.OK).json({
        success: true,
        oder: oderList
    });
})
const search = catchAsync(async (req, res, next) => {
    const state = req.query.state
    const phone = req.query.phone
    const list = await oderService.search(state,phone)
    res.status(httpStatus.OK).json({
        success: true,
        oder: list
    });
})
const view = catchAsync(async (req, res, next) => {
    const oder = await Cart.findById(req.params.id)
        if(!oder){
            return res.status(500).json({
                success: false,
                message: 'No product existed'
            });
        }
        res.json({
            success: true,
            oder: oder
        });
})
const exit = catchAsync(async (req, res) => {
    const id = req.params.id
    const oder = await  oderService.updates(id,req.body)
    res.status(httpStatus.OK).json({
        success: true,
        oder: oder
    });
})
const count = catchAsync(async (req, res) => {
    const key = req.params.state
    const day = req.query.day
    const list = await oderService.counts(key,day)
    res.status(httpStatus.OK).json({
        count: list
    });
})
const total = catchAsync(async (req, res) => {
    const key = req.params.state
    const list = await Cart.find({state: key})
    res.status(httpStatus.OK).json({
        count: list
    });
})

module.exports = {
    add,
    list,
    search,
    view,
    exit,
    count,
    viewState,
    viewDashboard
}
