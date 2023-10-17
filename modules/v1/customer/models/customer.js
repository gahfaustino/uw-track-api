const rfr = require('rfr')
const { DataTypes } = require('sequelize')
const db = rfr('/config/db').pgsql
//const Operations = require('./operation')

const model = db.define('Customer', {
  idCustomer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CLN_CODIGO'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'CLN_NOME'
  },
  shortName: {
    type: DataTypes.STRING,
    field: 'CLN_APELIDO'
  },
  fisJur: {
    type: DataTypes.STRING,
    field: 'CLN_FISJUR'
  },
  cnpjCpf: {
    type: DataTypes.STRING,
    field: 'CLN_CNPJCPF'
  },
  codCdd: {
    type: DataTypes.INTEGER,
    field: 'CLN_CODCDD'
  },
  codTco: {
    type: DataTypes.INTEGER,
    field: 'CLN_CODTCO'
  },
  cep: {
    type: DataTypes.STRING,
    field: 'CLN_CEP'
  },
  addressType: {
    type: DataTypes.STRING,
    field: 'CLN_CODLGR'
  },
  address: {
    type: DataTypes.STRING,
    field: 'CLN_ENDERECO'
  },
  addressNumber: {
    type: DataTypes.STRING,
    field: 'CLN_NUMERO'
  },
  addressLine2: {
    type: DataTypes.STRING,
    field: 'CLN_COMPLEMENTO'
  },
  region: {
    type: DataTypes.STRING,
    field: 'CLN_BAIRRO'
  },
  phone: {
    type: DataTypes.STRING,
    field: 'CLN_FONE'
  },
  email: {
    type: DataTypes.STRING,
    field: 'CLN_EMAIL'
  },
  website: {
    type: DataTypes.STRING,
    field: 'CLN_SITE'
  },
  codSgr: {
    type: DataTypes.INTEGER,
    field: 'CLN_CODSGR'
  },
  codCRR: {
    type: DataTypes.INTEGER,
    field: 'CLN_CODCRR'
  },
  faturar: {
    type: DataTypes.STRING,
    field: 'CLN_FATURAR'
  },
  isActive: {
    type: DataTypes.STRING,
    field: 'CLN_ATIVO'
  },
  reg: {
    type: DataTypes.STRING,
    field: 'CLN_REG'
  },
  idUser: {
    type: DataTypes.INTEGER,
    field: 'CLN_CODUSR'
  },
  perdaSinal: {
    type: DataTypes.INTEGER,
    field: 'CLN_PERDASINAL'
  },
  perdaSinalSemSM: {
    type: DataTypes.INTEGER,
    field: 'CLN_PERDASINALSEMSM'
  },
  oea: {
    type: DataTypes.INTEGER,
    field: 'CLN_OEA'
  },
  oeaContador: {
    type: DataTypes.INTEGER,
    field: 'CLN_OEACONTADOR'
  },
  arquivoProcedimentos: {
    type: DataTypes.STRING,
    field: 'CLN_ARQUIVO_PROCEDIMENTOS'
  },
  torreControle: {
    type: DataTypes.STRING,
    field: 'CLN_TORRECONTROLE'
  }

}, {
  tableName: 'CLIENTE',
  timestamps: false
})

module.exports = model
