const rfr = require('rfr')
const moment = rfr('/helpers/moment')
const Model = require('./models/useroperations')
const Operations = require('./models/operation')
const Customer = require('./models/customer')
const { Op, QueryTypes, Sequelize } = require('sequelize')

const controllerActions = {
  find: async (req, res) => {
    const { userId } = req.query

    try {
      const query = `SELECT DISTINCT cln.CLN_CODIGO AS idCustomer, cln.CLN_NOME AS name, cln.CLN_APELIDO AS shortName
      FROM USUARIOOPERACAO uo
      LEFT OUTER JOIN OPERACAO ope ON uo.UO_CODOPE=ope.OPE_CODIGO
      INNER JOIN CLIENTE cln ON ope.OPE_CODCLN = cln.CLN_CODIGO
      WHERE uo.UO_CODUSR=${userId} AND uo.UO_ATIVO='S'`

      const result = await Model.sequelize.query(query, {
        logging: console.log,
        plain: false,
        raw: true,
        type: QueryTypes.SELECT
      })

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  /*find: async (req, res) => {
    const { idUser, isActive, idSubOperation } = req.body
    let where = {}

    // if (idUser) where.idUser = Number(idUser)
    where.idUser = 2165
    // if (isActive) where.isActive = isActive
    where.isActive = 'S'
    if (idSubOperation) where.idSubOperation = Number(idSubOperation)

    try {
      const model = await Model.findAll({
        where: where,
        attributes: ['UO_CODOPE'],
        group: ['UO_CODOPE', 'OPE_CODIGO', 'CLN_CODIGO'],
        include: [{
          attributes: ['OPE_CODIGO'],
          model: Operations,
          include: [{
            attributes: ['CLN_CODIGO'],
            model: Customer,
            required: false,
            //group: 'idOperation',
            
          }]
        }],
      })
      res.status(200).json(model)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },*/
  findById: async (req, res) => {
    const { id } = req.params

    try {
      const model = await Model.findByPk(Number(id))

      res.status(200).json(model)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  create: async (req, res) => {
    const {
      userId,
      vehicleId,
      typeId,
      customerId,
      operationId,
      status
    } = req.body

    try {
      const model = await Model.create({
        userId: Number(userId),
        vehicleId: Number(vehicleId),
        typeId: Number(typeId),
        customerId: Number(customerId),
        operationId: Number(operationId),
        status: Number(status)
      })

      res.status(200).json(model)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const { userId, vehicleId, typeId, customerId, operationId, status, alertId } = req.body

    let values

    if (status) values.status = Number(status)
    if (userId) values.userId = Number(userId)
    if (typeId) values.typeId = Number(typeId)
    if (alertId) values.alertId = Number(alertId)
    if (customerId) values.customerId = Number(customerId)
    if (operationId) values.operationId = Number(operationId)
    if (vehicleId) values.vehicleId = Number(vehicleId)
    values.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')

    try {
      await Model.update(values, {
        where: {
          idSolicit: id
        }
      })

      res.status(200).json({ message: 'Register update successfuly' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  remove: async (req, res) => {
    const { id } = req.params
    try {
      await Model.destroy({
        where: {
          idSolicit: id
        }
      })

      res.status(200).json({ message: 'Register deleted successfuly' })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = controllerActions
