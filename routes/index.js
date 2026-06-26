const express = require('express')
const router = express.Router()
const getController = require('../controllers/get.controllers')
const putController = require('../controllers/put.controllers')
const deleteController = require('../controllers/delete.controllers')
const postController = require('../controllers/post.controllers') 
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')

router.get('/', getController)
router.get('/avis', getController)     
router.get('/avis/:id', getController) 

router.post('/add/avis', postController) 
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

router.put('/autoriser/avis/:id', authMiddleware, putController)
router.delete('/avis/:id', authMiddleware, deleteController)

module.exports = router