const rfr = require('rfr')
const userModel = rfr('modules/v1/user/models/model')
const jwtHelper = rfr('helpers/jwt')
const hash = rfr('helpers/hash')
const { isNil } = require('lodash')

const controllerActions = {
  fetch: (req, res) => {
  },
  authenticate: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await userModel.findOne({ where: { email: email } })

      if (user && hash.validate(password, user.password)) {
        const token = jwtHelper.generateToken(user)

        if(!isNil(user.activated_at) && user.isactive) {
          res.status(200).json({ error: '', id: user.id, name: user.name, email: user.email, token: token })
          return;
        } else {
          res.status(200).json({ error: 'pending approval', token: token })
          return;
        }

        //res.status(200).json({ error: '', id: user.id, name: user.name, email: user.email, token: token })
        //res.status(401).json({ error: 'wrong_credentials' })
      } else {
        res.status(401).json({ error: 'wrong_credentials' })
      }
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  validate: async (req, res) => {
    try {
      const { token } = req.query;
      jwtHelper.verifyToken(token, {}, res);
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  resetPassword: (req, res) => {

  },
  findByPasswordToken: (req, res) => {

  },
  updatePassword: (req, res) => {
    const query = { passwordToken: req.params.token }
  }
}

module.exports = controllerActions
