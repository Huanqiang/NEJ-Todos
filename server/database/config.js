const databaseConfig = {
  development: {
    host: '127.0.0.1',
    user: 'root',
    password: '124923',
    port: '3306',
    database: 'todos'
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'todos'
  }
}

export default databaseConfig
