const defaultOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.PSQL_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',

  migrationStorageTableName: 'migrations',
  freezeTableName: true,
  operatorsAliases: false,
  dialectOptions: {
    /**
     * Обязательный параметр для корректного сохранения данных в
     * decimal(27, 18) (миллионы и 18 чисел после запятой)
     * и корректного прокидывания из бд вместо строк - float
     */
    decimalNumbers: true
  },
  define: {
    underscored: true,
    freezeTableName: true,
    charset: 'utf8',
    paranoid: false,
    version: false
  }
}

module.exports = defaultOptions
