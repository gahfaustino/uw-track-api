const rfr = require('rfr')
const { DataTypes } = require('sequelize')

const db = rfr('/config/db').pgsql
const model = db.define('UserBills', {
    billingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'billingid'
  },
  userId: { 
    type: DataTypes.INTEGER,
    field: 'userid'
  },
  gstCertificateNumber: { 
    type: DataTypes.STRING,
    field: 'gstcertificatenumber'
  },
  gstCertificateFile: { 
    type: DataTypes.BLOB('long'),
    field: 'gstcertificatefile'
  },
  panNumber:{ 
    type: DataTypes.STRING,
    field: 'pannumber'
  },
  // panFile: { 
  //   type: DataTypes.BLOB('long'),
  //   field: 'panfile'
  // },
  billingAddress: { 
    type: DataTypes.STRING,
    field: 'billingaddress'
  },
}, {
  tableName: 'users_billing',
  timestamps: false
})

module.exports = model
