const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const multerMiddleware = multer({ storage }).single('gstCertFile')

module.exports = multerMiddleware;