const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const controller = require('../controllers/medication')

router.get('/list', authMiddleware, controller.list)
router.post('/save', authMiddleware, controller.save)
router.post('/delete/:id', authMiddleware, controller.delete)
router.post('/increment/:id', authMiddleware, controller.increment)
router.post('/decrement/:id', authMiddleware, controller.decrement)
router.post('/edit/', controller.edit)

module.exports = router
