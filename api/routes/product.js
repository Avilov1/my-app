const express = require('express')
const passport = require("passport");
const controller = require('../controllers/product')
const router = express.Router()

const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/:warehouseId', passportAuth, controller.getByWarehouseId)
router.delete('/:id', passportAuth, controller.remove)
router.post('/', passportAuth, controller.create)
router.patch('/:id', passportAuth, controller.update)

module.exports = router