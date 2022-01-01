const httpStatus = require('http-status')

const ApiError = require('../../../utils/api-error')
const { Discount } = require('../../models')

/**
 * Create a new
 * *@param {string} id
 * @param {Object} discountBody
 * @returns {Promise<Discount>}
 */
const creates = async (discountBody) => {
    console.log(discountBody)
    if (await Discount.isCodeTaken(discountBody.code)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'discount already taken')
    }
    return Discount.create(discountBody)
}
const view = async (page,size) => {
    if(page){
        pages = parseInt(page);
        if(pages<1)
            pages = 1;

        sizes = parseInt(size);
        if(sizes<5)
            sizes = 5;
        var skips = (pages-1)*sizes;
        const listNew = await Discount.find().skip(skips).limit(sizes)
        return listNew
    }else{
        sizes = parseInt(size);
        if(sizes<5)
            sizes = 5;
        const listNew = await Discount.find().limit(sizes)
        return listNew
    }
}
const search = async (key) => {
    const listsearch = await Discount.find({$text: {$search: key}});
    if (listsearch==0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No News')
    }
    return listsearch
}
const updates = async (id,discountBody) => {
    const discount = await Discount.findById(id);
    if (!discount) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No news existed')
    }
    return discount.update(discountBody)
}
const deletes = async (id) => {
    const discount = await Discount.findById(id);
    if (!discount) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No news existed')
    }
    return discount.remove(discountBody)
}
const searchVC = async (code) => {
    const discount = await Discount.find({code:code});
    if (!discount) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Voucher existed')
    }
    return discount
}

module.exports = {
    creates,
    updates,
    deletes,
    view,
    search,
    searchVC
}
