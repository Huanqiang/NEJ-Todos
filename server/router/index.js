import KoaRouter from 'koa-router'
import Todos from './Todos'

const router = new KoaRouter()

router.get('/api/todos', Todos.getAll)
router.post('/api/todos', Todos.create)
router.post('/api/todos/update', Todos.updateById)
router.post('/api/todos/update/list', Todos.updateList)
router.delete('/api/todos', Todos.deleteById)

export default router
