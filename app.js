import Koa from 'koa'
import serve from 'koa-static'
import cors from '@koa/cors'
// const serve = require('koa-static');
// const cors = require('@koa/cors');
import KoaBodyparser from 'koa-bodyparser'
import router from './server/router'
import database from './server/database'

let app = new Koa()


app.use(serve(__dirname + '/src'))
app.use(cors());
app.use(KoaBodyparser())

// 路由处理
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log(__dirname)
  console.log(`已经开启服务，端口：${3000}`)
})

database.sequelize.sync()
