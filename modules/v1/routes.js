const router = require('express').Router()
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

/**
 * Use the modules routes. It's safer doing in a separate file than magically, to
 * be sure nester routes will be applied correctly.
 */
router.use('/auth', require('./auth/routes'))
router.use('/users', require('./user/routes'))
router.use('/tracking', createProxyMiddleware({
  target: 'http://localhost:8081',
  pathRewrite: {
    '/api/v1/tracking': '/api'
  },
  changeOrigin: true,
  onProxyReq: fixRequestBody,
})),

router.use('/customer', require('./customer/routes'))


// Return router
module.exports = router
