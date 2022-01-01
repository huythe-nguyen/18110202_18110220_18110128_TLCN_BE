const express = require('express')
const { OrderControllerUser, oderController } = require('../../controllers')
const validate = require('../../../middlewares/validate')

const router = express.Router()
router.post('/add', oderController.add)
router.get('/:status', oderController.list)
router.get('/', oderController.search)
router.get('/edit/:id', oderController.view)
router.put('/edit/:id', oderController.exit)
router.get('/count/:state', oderController.count)
router.get('/dashboard/:status', oderController.viewDashboard)
router.get('/delivery/:status', oderController.viewState)
module.exports = router
