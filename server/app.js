import Koa from 'koa'
const cors = require('@koa/cors');
import KoaLogger from 'koa-logger'
import KoaBodyparser from 'koa-bodyparser'

import router from './router'
import database from './database'

let app = new Koa()

app.use(KoaLogger())
app.use(cors());
app.use(KoaBodyparser())

// 路由处理
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log(`已经开启服务，端口：${3000}`)
})

database.sequelize.sync()
