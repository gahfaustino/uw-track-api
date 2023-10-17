const rfr = require('rfr')
const router = require('express').Router()
const controller = require('./controller')
const validators = require('./validators')
const jwtMiddleware = rfr('/helpers/jwt').middleware

// Get user by JWT
router.get('/', [], controller.fetch)

// Create JWT
router.post('/login', [], controller.authenticate)

// Validate JWT
router.get('/session', [], controller.validate)

// Set password reset token and send reset password email
router.post('/reset', validators.reset, controller.resetPassword)

// Get by Passwork Token
router.get('/passwordtoken/:token', [], controller.findByPasswordToken)

// Update the user password
router.patch('/:token/password', validators.updatePassword, controller.updatePassword)

module.exports = router
