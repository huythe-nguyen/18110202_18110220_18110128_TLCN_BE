const Joi = require('joi')


const discountSchema = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
        description: Joi.string().required(),
        brand: Joi.string().required(),
        discount: Joi.number().required(),
        amount: Joi.number().required(),
        starDay: Joi.date().required(),
        endDay: Joi.date().required(),
        state: Joi.string().required()

    })
}
module.exports = {
    discountSchema
}
