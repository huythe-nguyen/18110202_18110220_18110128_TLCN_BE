
const mongoose = require('mongoose')
const validator = require('validator')

const { toJSON, paginate } = require('./plugins')

const discountSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        starDay: {
            type: Date,
            required: true,
            trim: true
        },
        endDay: {
            type: Date,
            required: true,
            trim: true
        },
        discount: {
            type: Number,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

discountSchema.plugin(toJSON)
discountSchema.plugin(paginate)
discountSchema.index({'$**': 'text'});

/**
 * Check if product is taken
 * @param {string} code
 * @param {ObjectId} [excludeDiscountId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 discountSchema.statics.isCodeTaken = async function (code, excludeDiscountId) {
    const discount = await this.findOne({ code, _id: { $ne: excludeDiscountId } })
    return !!discount
}

/**
 * @typedef Discount
 */
const Discount = mongoose.model('Discount', discountSchema)

module.exports = Discount
