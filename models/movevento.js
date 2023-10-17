const rfr = require('rfr')
const { DataTypes } = require('sequelize')
const db = rfr('/config/db').pgsql

const model = db.define('Solicitation', {
  idEvent: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'ME_CODIGO'
  },
  vehiclePlate: {
    type: DataTypes.STRING,
    field: 'ME_CODVCL',
    allowNull: false
  },
  codCea: {
    type: DataTypes.STRING,
    field: 'ME_CODCEA',
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    field: 'ME_POSICAO',
    allowNull: false
  },
  dateGps: {
    type: DataTypes.STRING,
    field: 'ME_DATAGPS',
    allowNull: true
  },
  dateOperator: {
    type: DataTypes.STRING,
    field: 'ME_DATAOPERADOR'
  },
  dateCheck: {
    type: DataTypes.STRING,
    field: 'ME_DATABAIXA'
  },
  codMao: {
    type: DataTypes.INTEGER,
    field: 'ME_CODMAO'
  },
  codMlr: {
    type: DataTypes.INTEGER,
    field: 'ME_CODMLR'
  },
  priority: {
    type: DataTypes.INTEGER,
    field: 'ME_PRIORIDADE'
  },
  codSM: {
    type: DataTypes.INTEGER,
    field: 'ME_CODSM',
    allowNull: true
  },
  hasSM: {
    type: DataTypes.STRING,
    field: 'ME_TEMSM'
  },
  startedSM: {
    type: DataTypes.STRING,
    field: 'ME_SMINICIADA'
  },
  idTarget: {
    type: DataTypes.INTEGER,
    field: 'ME_CODALV'
  },
  insmop: {
    type: DataTypes.STRING,
    field: 'ME_INSMOP'
  },
  email: {
    type: DataTypes.STRING,
    field: 'ME_EMAIL'
  },
  message: {
    type: DataTypes.STRING,
    field: 'ME_MENSAGEM'
  },
  text: {
    type: DataTypes.STRING,
    field: 'ME_TEXTO'
  },
  area: {
    type: DataTypes.STRING,
    field: 'ME_AREA'
  },
  insert: {
    type: DataTypes.STRING,
    field: 'ME_INSERT'
  },
  update: {
    type: DataTypes.STRING,
    field: 'ME_UPDATE'
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'ME_CODUSR'
  },
  dateStart: {
    type: DataTypes.STRING,
    field: 'ME_DATAINICIOATENDIMENTO'
  },
  reason: {
    type: DataTypes.STRING,
    field: 'ME_MOTIVO'
  },
  justification: {
    type: DataTypes.STRING,
    field: 'ME_JUSTIFICATIVA'
  }
}, {
  tableName: 'VMOVTOEVENTO',
  timestamps: false
})

module.exports = model
