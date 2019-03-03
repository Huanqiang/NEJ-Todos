export default (sequelize, DataType) => {
  const Todo = sequelize.define(
    'todo',
    {
      id: { type: DataType.INTEGER, primaryKey: true },
      label: { type: DataType.STRING, allowNull: false },
      isCompleted: { type: DataType.BOOLEAN, defaultValue: false },
      isDeleted: { type: DataType.BOOLEAN, defaultValue: false }
    },
    {
      defaultScope: {
        where: {
          isDeleted: false
        }
      },
      charset: 'utf8',
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )

  Todo.findTodos = async () => {
    return await Todo.findAll()
  }

  Todo.insert = async newTodo => {
    let result = await Todo.create(newTodo)
    return result.get({ plain: true })
  }

  Todo.updateById = async (id, todo) => {
    let result = await Todo.update({ label: todo.label, isCompleted: todo.isCompleted }, { where: { id } })
    return result[0]
  }

  Todo.updateList = async todos => {
    let result = await todos.reduce(async (res, todo) => {
      return [
        ...(await res),
        ...(await Todo.update({ label: todo.label, isCompleted: todo.isCompleted }, { where: { id: todo.id } }))
      ]
    }, [])

    return await result
  }

  Todo.delete = async ids => {
    let result = await ids.reduce(async (res, id) => {
      return [...(await res), ...(await Todo.update({ isDeleted: true }, { where: { id } }))]
    }, [])

    return (await result).every(s => s === 1)
  }

  // Todo.deleteList = async (ids) => {
  //   let result = ids.forEach(id => {
  //     await Todo.update({ isDeleted: true }, { where: { id } })
  //   })
  //   return result[0] === 1
  // }

  return Todo
}
