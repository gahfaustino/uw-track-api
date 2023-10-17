const multer  = require('multer')
const upload = multer().single('avatar')

const multerMiddleware = (req, res, next) => {
    try {
        return upload.single('uploaded_file')
    } catch(err) {
        console.log('Err Multer', err)
    }

    return upload.single('uploaded_file')
};

module.exports = multerMiddleware;