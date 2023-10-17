const { Sequelize } = require('sequelize')
console.log('process env', process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD);
var pgsql = new Sequelize('postgres://vultradmin:AVNS_6UEmA1HHPXV2KSyFBIA@vultr-prod-e90db61d-7455-47b1-9067-a396e29134ba-vultr-prod-6a5d.vultrdb.com:16751/defaultdb', { 
  dialect: 'postgres', 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
})

module.exports = {
  pgsql: pgsql
}
