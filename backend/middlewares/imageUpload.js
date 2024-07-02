const multer = require('multer')
const path = require('path')

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ''

        if (req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('photos')) {
            folder = 'photos'
        }

        cb(null, `uploads/${folder}`)
    },

    // Utilizar UUID para gerar nome aleatório para a imagem se o sistema crescer muito
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }