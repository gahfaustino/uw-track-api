const rfr = require('rfr')
const router = require('express').Router()
const controller = require('./controller')
const validators = require('./validators')
const jwtMiddleware = rfr('/helpers/jwt').middleware
const multerMiddleware = rfr('/helpers/multer')

// Create
router.post('/', [validators.create, validators.uniqueEmailValidator], controller.create)

// Update
router.put('/:id', [jwtMiddleware], controller.update)

// Billing Insert
router.post('/:id/billing', [jwtMiddleware], controller.billingCreate)

// Billing Update
router.put('/:id/billing', [jwtMiddleware], controller.billingUpdate)

// Save Billings Documents 
router.post('/:id/document/upload', [jwtMiddleware, multerMiddleware], controller.documentUpload)

// Get Billings Documents 
router.get('/:id/document/view', [jwtMiddleware], controller.documentDownload)

// Approve
router.post('/approve', [jwtMiddleware], controller.approve)

// Attach
router.post('/attach', [jwtMiddleware], controller.attach)

// Get
router.get('/', [jwtMiddleware], controller.find)

// Get
router.get('/session', [jwtMiddleware], controller.getSession)

// // Check if exists
// router.post('/email', [validators.email], controller.checkExists)
// router.post('/username', [validators.username], controller.checkExists)

// // Get by Id
// router.get('/:id', [], controller.findById)

// // Update
// router.patch('/:id', [jwtMiddleware, validators.update, validators.uniqueEmailValidator, validators.uniqueUsernameValidator], controller.findOneAndUpdate)

// // Delete
// router.delete('/:id', [jwtMiddleware], controller.remove)

// Delete
router.delete('/:id', [jwtMiddleware], controller.remove)

module.exports = router
