const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

// Generate User Token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
}

//Register User and Sign In
const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user already exists
    const user = await User.findOne({ email })

    if (user) {
        return res.status(422).json({
            errors: ['Email already exists'],
        })
    }

    // Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    })

    // Generate token
    if (!newUser) {
        return res.status(422).json({
            errors: ['Failed to create user'],
        })
    }

    return res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })

}

// Sign user in
const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // Check if user exists
    if (!user) {
        return res.status(404).json({
            errors: ['User not found'],
        })
    }

    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            errors: ['Invalid credentials'],
        })
    }

    //Return token
    return res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    getCurrentUser
}