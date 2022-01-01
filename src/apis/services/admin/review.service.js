const httpStatus = require('http-status')

const ApiError = require('../../../utils/api-error')
const Review = require('../../models/review.model');

/**
 * Create a product
 *@param {string} id
 * @param {Object} oderBody
 * @returns {Promise<Oder>}
 *
 */


const list = async (page,size) => {

    if(page){
        pages = parseInt(page);
        if(pages<1)
            pages = 1;

        sizes = parseInt(size);
        if(sizes<5)
            sizes = 5;
        var skips = (pages-1)*sizes;
        const list = await Review.find({state: "Chưa trả lời"}).skip(skips).limit(sizes)
        return list
    }else{
        sizes = parseInt(size);
        if(sizes<5)
            sizes = 5;
        const list = await Review.find({state: "Chưa trả lời"}).limit(sizes)
        return list
    }


}

module.exports = {
    list
}
