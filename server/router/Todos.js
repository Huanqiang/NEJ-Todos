import database from '../database'

const getAll = async ctx => {
  try {
    ctx.body = await database.todo.findTodos()
  } catch (error) {
    ctx.throw(400, error)
  }
}

const create = async ctx => {
  const data = Object.keys(ctx.request.body)
  const newTodo = JSON.parse(data[0])
  try {
    const todo = await database.todo.insert(newTodo)
    ctx.body = {
      success: newTodo.label === todo.label,
      todo
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const updateById = async ctx => {
  const data = Object.keys(ctx.request.body)
  const updatedTodo = JSON.parse(data[0])
  console.log('updateById', ctx.query.id, updatedTodo)
  try {
    const todo = await database.todo.updateById(ctx.query.id, updatedTodo)
    ctx.body = {
      success: updatedTodo.label === todo.label,
      todo
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const updateList = async ctx => {
  const data = Object.keys(ctx.request.body)
  const updatedTodos = JSON.parse(`[${data[0]}]`)
  try {
    const todos = await database.todo.updateList(updatedTodos)
    ctx.body = {
      success: true,
      todos
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

const deleteById = async ctx => {
  try {
    let result = await database.todo.delete(JSON.parse(ctx.query.ids))
    ctx.body = {
      success: result
    }
  } catch (error) {
    ctx.throw(400, error)
  }
}

export default { getAll, create, updateById, updateList, deleteById }
