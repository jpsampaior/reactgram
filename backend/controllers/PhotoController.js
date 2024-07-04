const Photo = require('../models/Photo')
const User = require('../models/User')

const mongoose = require('mongoose')

// Insert a photo, with an user related
const insertPhoto = async (req, res) => {
    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        title,
        image,
        userId: user._id,
        userName: user.name,
    })

    if (!newPhoto) {
        return res.status(400).json({ errors: 'Error inserting photo' })
    }

    return res.status(201).json(newPhoto)
}

// Remove a photo from DB
const deletePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Check if photo exists
        if (!photo) {
            return res.status(404).json({ errors: 'Photo not found' })
        }

        // Check if user is the owner of the photo
        if (!photo.userId.equals(reqUser._id)) {
            return res.status(403).json({ errors: 'Unauthorized' })
        }

        await Photo.findByIdAndDelete(photo._id)

        return res.status(200).send({ id: photo._id, message: 'Photo deleted' })
    } catch (error) {
        return res.status(500).json({ errors: 'Server error' })
    }
}

// Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort({ createdAt: -1 }).exec()

    return res.status(200).json(photos)
}

const getPhotoByUserId = async (req, res) => {
    const { id } = req.params

    const photos = await Photo.find({ userId: id }).sort({ createdAt: -1 }).exec()

    return res.status(200).json(photos)
}

// Get a photo by id
const getPhotoById = async (req, res) => {
    const { id } = req.params

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    if (!photo) {
        return res.status(404).json({ errors: 'Photo not found' })
    }

    return res.status(200).json(photo)
}

// Update a photo
const updatePhoto = async (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const photo = await Photo.findById(id)

    if (!photo) {
        return res.status(404).json({ errors: 'Photo not found' })
    }

    if (!photo.userId.equals(req.user._id)) {
        return res.status(403).json({ errors: 'Unauthorized' })
    }

    photo.title = title
    await photo.save()

    return res.status(200).json({ photo, message: 'Photo updated' })
}

const likePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(id)

        // Check if photo exists
        if (!photo) {
            return res.status(404).json({ errors: 'Photo not found' })
        }

        // Check if user already liked the photo
        if (photo.likes.includes(reqUser._id)) {
            return res.status(403).json({ errors: 'Already liked' })
        }

        photo.likes.push(reqUser._id)
        await photo.save()

        return res.status(200).json({ photoId: id, userId: req.user._id, message: 'Photo liked' })
    } catch (error) {
        return res.status(500).json({ errors: 'Server error' })
    }
}

const commentPhoto = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    try {
        const photo = await Photo.findById(id)

        // Check if photo exists
        if (!photo) {
            return res.status(404).json({ errors: 'Photo not found' })
        }

        const userComment = {
            userId: reqUser._id,
            userName: reqUser.name,
            userImage: user.profileImage,
            comment
        }

        photo.comments.push(userComment)

        await photo.save()

        return res.status(200).json({ comment: userComment, message: 'Comment added' })
    } catch (error) {
        return res.status(500).json({ errors: 'Server error' })
    }
}

// Search for a photo by title	
const searchPhoto = async (req, res) => {
    const { q } = req.query

    const photos = await Photo.find({ title: new RegExp(q, "i")}).exec()

    return res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getPhotoByUserId,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto
}