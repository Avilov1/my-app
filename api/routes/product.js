const express = require('express')
const controller = require('../controllers/product')
const router = express.Router()

router.get('/:warehouseId ', controller.getByWarehouseId)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/:id', controller.update)

module.exports = router