const rfr = require('rfr')
const { DataTypes } = require('sequelize')

const db = rfr('/config/db').pgsql
const model = db.define('UserBills', {
    billingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'billingId'
  },
  userId: DataTypes.INTEGER,
  gstCertificateNumber: DataTypes.STRING,
  gstCertificateFile: DataTypes.BLOB,
  panNumber: DataTypes.STRING,
  panFile: DataTypes.BLOB('long'),
  billingAddress: DataTypes.STRING
}, {
  tableName: 'users_billing',
  timestamps: false
})

module.exports = model
