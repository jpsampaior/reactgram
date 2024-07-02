const express = require('express')
const router = express.Router()

// Controler
const { register, login, getCurrentUser, updateUser, getUserById } = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidation')
const { userCreateValidation, userLoginValidation, userUpdateValidation } = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const { imageUpload } = require('../middlewares/imageUpload')


// Routes
router.post('/register', userCreateValidation(), validate, register)
router.post('/login', userLoginValidation(), validate, login)
router.get('/profile', authGuard, getCurrentUser)
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), updateUser)
router.get('/:id', getUserById)

module.exports = router