import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import dbConfig from './config'

let env = process.env.NODE_ENV || 'development'
let config = dbConfig[env]
// import logger from '../logger'

let sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 30000
  }
  // logging: false
})

let db = {}

// 自动读取出本身以外的所有model文件，并使用 sequelize.import 加入 db
// const basename = path.basename(__filename)
const modelspath = `${__dirname}/models/`
fs.readdirSync(modelspath).filter(file => (file.slice(-3) === '.js')).forEach(file => {
  let model = sequelize['import'](path.join(modelspath, file))
  db[model.name] = model
})

db.sequelize = sequelize

export default db
