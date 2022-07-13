const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const config = require('../../config/database.js')
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const cleanName = file => {
  return file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
}

const collectModel = file => {
  const model = sequelize.import(path.join(__dirname, file))

  db[model.name] = model
}

fs
  .readdirSync(__dirname)
  .filter(cleanName)
  .forEach(collectModel)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

db.sequelize = sequelize

module.exports = db
