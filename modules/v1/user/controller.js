const rfr = require('rfr')
const { head } = require('lodash')
const moment = rfr('/helpers/moment')
const jwt = rfr('/helpers/jwt')
const Model = require('./models/model')
const BillingModel = require('./models/billing')
const hash = rfr('helpers/hash')
const path = require('path')

const controllerActions = {
  find: async (req, res) => {

    try {
      const model = await Model.findAll({
        where: deleted_at = null,
        attributes: {exclude: ['password']},
        include: [{
          model: BillingModel,
          required: false,
        }],
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
    const { id } = req.params

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
    const { id } = req.params

    const {
      gstCertNumber,
      panNumber,
      address,
    } = req.body

    try {
      const model = await BillingModel.update({
        gstCertificateNumber: gstCertNumber,
        panNumber: panNumber,
        billingaddress: address,
        userId: id
      }, {
        where: { 
          userId: id
        } 
      })

      res.status(200).json(model)
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },
  documentUpload: async (req, res) => {
    const { id } = req.params
    const { gstCertFile } = req.files;

    try {
      const model = await BillingModel.update({
        gstCertFile: head(gstCertFile).data
      }, {
        where: { 
          userId: id
        } 
      })

      res.status(200).json({msg: 'File Uploaded Succefully!!!', data: model})
    } catch (err) {
      console.log('Error', err)
      res.status(500).json(err)
    }
  },

  documentDownload: async (req, res) => {
    const { id } = req.params

    try {
      const model = await BillingModel.findOne({
        where: {
          userId: id
        },
       })

      res.setHeader('Content-type', 'application/pdf');
      res.send(model?.gstCertFile);
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
    console.log('body', req.body)
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
    const payload = await jwt.getPayload(req)
    const id = payload?.sub;

    try {
      const model = await Model.findOne({ 
        where: { id: id, deleted_at: null },
        attributes: {exclude: ['password']},
        include: [{
          model: BillingModel,
          required: false,
        }],
      })
      console.log('model', model);
      res.status(200).json(model)
      //res.status(200).json({ hashed: crypto.gen(password) })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
}

module.exports = controllerActions
