const rfr = require('rfr')
const moment = rfr('/helpers/moment')
const jwt = rfr('/helpers/jwt')
const Model = require('./models/model')
const hash = rfr('helpers/hash')
const crypto = rfr('helpers/crypto')

const controllerActions = {
  find: async (req, res) => {

    try {
      const model = await Model.findAll({
        where: deleted_at = null,
        attributes: {exclude: ['password']},
        order: [['id','DESC']]
      })

      res.status(200).json(model)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  create: async (req, res) => {
    const {
      name,
      email,
      password,
      isactive
    } = req.body

    try {
      const model = await Model.create({
        name: name,
        email: email,
        password: hash.gen(password),
        isactive: isactive,
      })

      res.status(200).json(model)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  update: async (req, res) => {
    // const {
    //   name,
    //   email,
    //   password,
    //   isactive
    // } = req.body
    const { id } = req.params
    console.log('body', id);
    try {
      const model = await Model.update(req.body, {
        where: { 
          id: id
        } 
      })

      res.status(200).json(model)
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  billingUpdate: async (req, res) => {
    // const {
    //   name,
    //   email,
    //   password,
    //   isactive
    // } = req.body
    // const { id } = req.params
    // console.log('body', id);
    try {
      // const model = await Model.update(req.body, {
      //   where: { 
      //     id: id
      //   } 
      // })

      console.log(req.body);
      res.status(200).json(req.body)
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  documentUpload: async (req, res) => {
    // const {
    //   name,
    //   email,
    //   password,
    //   isactive
    // } = req.body
    // const { id } = req.params
    // console.log('body', id);
    try {
      // const model = await Model.update(req.body, {
      //   where: { 
      //     id: id
      //   } 
      // })

      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
        } else if (err) {
          // An unknown error occurred when uploading.
        }
    
        // Everything went fine.
      })

      const { file } = req.body;
      console.log('file', req.file, file);

      res.status(200).json(req.body)
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  attach: async (req, res) => {
    const {
      userId,
      trackuserid,
      active
    } = req.body

    try {
      const model = await Model.update({
        trackuserid: trackuserid,
        isactive: active,
        activated_at: moment().format(),

      }, {
        where: {
          id: userId
        }
      })

      res.status(200).json(model)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  remove: async (req, res) => {
    const { id } = req.params

    try {
      const model = await Model.update({
        deleted_at: moment().format(),
      }, {
        where: {
          id: id
        }
      })

      res.status(200).json(model)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getSession: async (req, res) => {
    const payload = jwt.getPayload(req)
    const id = payload?.sub;

    try {
      const model = await Model.findOne({ 
        where: { id: id, deleted_at: null },
        attributes: {exclude: ['password']}
      })

      res.status(200).json(model)
      //res.status(200).json({ hashed: crypto.gen(password) })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
}

module.exports = controllerActions
