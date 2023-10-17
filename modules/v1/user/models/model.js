const rfr = require('rfr')
const { DataTypes } = require('sequelize')

const db = rfr('/config/db').pgsql
const model = db.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  remember_token: DataTypes.STRING,
  facebook_id: DataTypes.STRING,
  google_id: DataTypes.STRING,
  github_id: DataTypes.STRING,
  contact_name: DataTypes.STRING,
  company_name: DataTypes.STRING,
  website: DataTypes.STRING,
  enable_portal: DataTypes.INTEGER,
  currency_id: DataTypes.INTEGER,
  created_at: DataTypes.STRING,
  activated_at: DataTypes.STRING,
  deleted_at: DataTypes.STRING,
  updated_at: DataTypes.STRING,
  creator_id: DataTypes.INTEGER,
  isactive: DataTypes.BOOLEAN,
  trackuserid: DataTypes.INTEGER,
}, {
  tableName: 'users',
  timestamps: false
})

module.exports = model
