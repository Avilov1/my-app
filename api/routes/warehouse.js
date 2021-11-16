const express = require('express')
const passport = require('passport')
const controller = require('../controllers/warehouse')
const router = express.Router()

const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/', passportAuth, controller.getAll)
router.get('/:id', passportAuth, controller.getById)
router.delete('/:id', passportAuth, controller.remove)
router.post('/', passportAuth, controller.create)
router.patch('/:id', passportAuth, controller.update)

module.exports = router