const rfr = require('rfr')
const moment = rfr('/helpers/moment')
const Model = require('./model')

const controllerActions = {
  find: async (req, res) => {
    const { userId, state } = req.query

    try {
      const model = await Model.findAll({
        where: {
          isactive: true
        },
      })

      res.status(200).json(model)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  // findById: async (req, res) => {
  //   const { id } = req.params

  //   try {
  //     const model = await Model.findByPk(Number(id))

  //     res.status(200).json(model)
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // },
  // create: async (req, res) => {
  //   const {
  //     userId,
  //     vehicleId,
  //     typeId,
  //     customerId,
  //     operationId,
  //     status
  //   } = req.body

  //   try {
  //     const model = await Model.create({
  //       userId: Number(userId),
  //       vehicleId: Number(vehicleId),
  //       typeId: Number(typeId),
  //       customerId: Number(customerId),
  //       operationId: Number(operationId),
  //       status: Number(status)
  //     })

  //     res.status(200).json(model)
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // },
  // update: async (req, res) => {
  //   const { id } = req.params
  //   const { userId, vehicleId, typeId, customerId, operationId, status, alertId } = req.body

  //   let values

  //   if (status) values.status = Number(status)
  //   if (userId) values.userId = Number(userId)
  //   if (typeId) values.typeId = Number(typeId)
  //   if (alertId) values.alertId = Number(alertId)
  //   if (customerId) values.customerId = Number(customerId)
  //   if (operationId) values.operationId = Number(operationId)
  //   if (vehicleId) values.vehicleId = Number(vehicleId)
  //   values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')

  //   try {
  //     await Model.update(values, {
  //       where: {
  //         idSolicit: id
  //       }
  //     })

  //     res.status(200).json({ message: 'Register update successfuly' })
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // },
  // remove: async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     await Model.destroy({
  //       where: {
  //         idSolicit: id
  //       }
  //     })

  //     res.status(200).json({ message: 'Register deleted successfuly' })
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // }
}

module.exports = controllerActions
