const rfr = require('rfr')
const { head, find } = require('lodash')
const moment = rfr('/helpers/moment')
const jwt = rfr('/helpers/jwt')
const Model = require('./models/model')
const BillingModel = require('./models/billing')
const hash = rfr('helpers/hash')
const path = require('path')
const { getAllUser, createUser } = rfr('/services/TrackService')

const controllerActions = {
  find: async (req, res) => {

    try {
      const model = await Model.findAll({
        where: { deleted_at: null },
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
  billingCreate: async (req, res) => {
    const { id } = req.params

    const {
      gstCertNumber,
      panNumber,
      address,
    } = req.body

    try {
      const model = await BillingModel.create({
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
  approve: async (req, res) => {
    
    const {
      userId,
      trackuserid,
      active
    } = req.body

      const { id, email } = req.body;
      const allUsers = await getAllUser();
      const currentUser = find(allUsers?.data, { email })
      
      if(currentUser) {
        res.status(409).json({ status: 409, error: `Given user ${email} already exist on Tracking Platform`, message: `Given user ${email} already exist on Tracking Platform` })
        return;
      }

      await createUser(req.body)
      .then(response => {
        const { status, data } = response
        if(status === 200) {
          const trackuserid = data?.id
          const model = Model.update({
            trackuserid: trackuserid,
            isactive: true,
            activated_at: moment().format(),
          }, {
            where: {
              id: id
            }
          })

          res.status(200).json(model)
          return;
        } else {
          res.status(status).json({ status: status, error: data })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(err.response?.status).json({ status: err.response?.status, error: String(err.response?.data)})
      });
      
      
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
          attributes: { exclude: ['gstCertFile', 'gstcertfile'] },
          required: false,
        }],
      })
      
      res.status(200).json(model)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
}

module.exports = controllerActions
