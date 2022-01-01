const express = require('express')
const { authController, productController } = require('../../controllers')
const { authValidation, productValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')
const reviewRoutes = require('../v1/review.routes');
const {  reviewsController } = require('../../controllers')
const router = express.Router()

router.post('/add', validate(productValidation.productSchema), productController.addProduct)
router.get('/', productController.listProduct)
router.get('/count', productController.parinato)
router.get('/:key', productController.searchProduct)
router.get('/filter/:min,:max', productController.filterPrice)
router.get('/edit/:id', productController.viewProduct)
router.put('/edit/:id', productController.exitProduct)
router.delete('/:id', productController.deleteProduct)
router.use('/:productId/reviews/:idUser', reviewRoutes);
router.get('/review/state', reviewsController.list)
router.get('/review/count', reviewsController.parinato)
router.get('/review/:id', reviewsController.review)
module.exports = router
