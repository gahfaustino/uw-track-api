const rfr = require('rfr')
const { DataTypes } = require('sequelize')
const db = rfr('/config/db').pgsql
const Operations = require('./operation')
//const Customer = require('./customer')

const model = db.define('UserOperation', {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'UO_CODUSR'
  },
  idOpe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'UO_CODOPE',
    references: {
      model: Operations,
      key: 'idOperation'
    }
  },
  isActive: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'UO_ATIVO'
  },
  reg: {
    type: DataTypes.STRING,
    field: 'UO_REG'
  },
  sisIdUser: {
    type: DataTypes.INTEGER,
    field: 'SIS_CODUSR'
  },
  idSubOperation: {
    type: DataTypes.INTEGER,
    field: 'UO_CODSUBOPE'
  }
}, {
  tableName: 'USUARIOOPERACAO',
  timestamps: false
})
model.hasOne(Operations, {
  foreignKey: 'idOperation',
  sourceKey: 'idOpe'
})

module.exports = model
