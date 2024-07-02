const { body } = require('express-validator');

const userCreateValidation = () => {
    return [
        body('name')
        .isString().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email')
        .isString().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),
        body('password')
        .isString().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('confirmPassword')
        .isString().withMessage('Confirm Password is required')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
    ]
}


const userLoginValidation = () => {
    return [
        body('email')
        .isString().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),
        body('password')
        .isString().withMessage('Password is required')
    ]
}

const userUpdateValidation = () => {
    return [
        body('name')
        .optional()
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]
}

module.exports = {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation
}