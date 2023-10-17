const rfr = require('rfr')
const { DataTypes } = require('sequelize')
const db = rfr('/config/db').pgsql
//const UserOperation = require('./useroperations')
const Customer = require('./customer')

const model = db.define('Operation', {
  idOperation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'OPE_CODIGO',
    /*references: {
      model: UserOperation,
      key: 'idOperation'
    }*/
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'OPE_NOME'
  },
  shortName: {
    type: DataTypes.STRING,
    field: 'OPE_APELIDO'
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    field: 'OPE_CODCLN',
    references: {
      model: Customer,
      key: 'idCustomer'
    }
  },
  fisJur: {
    type: DataTypes.STRING,
    field: 'OPE_FISJUR'
  },
  cnpjCpf: {
    type: DataTypes.STRING,
    field: 'OPE_CNPJCPF'
  },
  idCdd: {
    type: DataTypes.INTEGER,
    field: 'OPE_CODCDD'
  },
  cep: {
    type: DataTypes.STRING,
    field: 'OPE_CEP'
  },
  addressType: {
    type: DataTypes.STRING,
    field: 'OPE_CODLGR'
  },
  address: {
    type: DataTypes.STRING,
    field: 'OPE_ENDERECO'
  },
  addressNumber: {
    type: DataTypes.STRING,
    field: 'OPE_NUMERO'
  },
  addressLine2: {
    type: DataTypes.STRING,
    field: 'OPE_COMPLEMENTO'
  },
  region: {
    type: DataTypes.STRING,
    field: 'OPE_BAIRRO'
  },
  phone: {
    type: DataTypes.STRING,
    field: 'OPE_FONE'
  },
  email: {
    type: DataTypes.STRING,
    field: 'OPE_EMAIL'
  },
  website: {
    type: DataTypes.STRING,
    field: 'OPE_SITE'
  },
  voicePassword: {
    type: DataTypes.STRING,
    field: 'OPE_SENHAVOZ'
  },
  isActive: {
    type: DataTypes.STRING,
    field: 'OPE_ATIVO'
  },
  reg: {
    type: DataTypes.STRING,
    field: 'OPE_REG'
  },
  idUser: {
    type: DataTypes.INTEGER,
    field: 'OPE_CODUSR'
  },
  interno: {
    type: DataTypes.STRING,
    field: 'OPE_INTERNO'
  }
}, {
  tableName: 'OPERACAO',
  timestamps: false
})

model.hasOne(Customer, {
  foreignKey: 'idCustomer',
  sourceKey: 'idCustomer'
})

module.exports = model
