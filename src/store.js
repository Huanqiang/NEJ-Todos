
NEJ.define([], function (_p) {
  let todos = [{
    id: 1,
    label: 'test',
    completed: false
  }, {
    id: 2,
    label: 'test2',
    completed: true
  }]

  const updateComponents = []

  _p._$getAllTodos = function () {
    return todos
  }

  _p._$getActiveTodos = function () {
    return todos.filter(todo => !todo.completed)
  }

  _p._$getCompletedTodos = function () {
    return todos.filter(todo => todo.completed)
  }

  _p._$addTodo = function (label) {
    todos = [...todos, { id: todos[todos.length - 1].id + 1, label, completed: false }]
    // 执行更新后，手动触发更新，本操作应该放在父组件中的
    _p.__dispatchUpdate()
  }

  _p._$toggleTodo = function (id) {
    todos = todos.map(todo => {
      return id === todo.id ? {
        ...todo,
        completed: !todo.completed
      } : todo
    })
    // 执行更新后，手动触发更新，本操作应该放在父组件中的
    _p.__dispatchUpdate()
  }

  _p._$clearAllCompletedTodos = function () {
    todos = todos.filter(todo => !todo.completed)
    // 执行更新后，手动触发更新，本操作应该放在父组件中的
    _p.__dispatchUpdate()
  }

  _p._$deleteTodo = function (id) {
    todos = todos.filter(todo => todo.id != id)
    // 执行更新后，手动触发更新，本操作应该放在父组件中的
    _p.__dispatchUpdate()
  }

  // 如果有一个完成，则全部完成，否则如果全部完成，则转为未完成，如果全部未完成，则转为完成
  _p._$toggleAll = function () {
    const hasCompleted = todos.some(todo => todo.completed)
    const allCompleted = todos.every(todo => todo.completed)
    if (allCompleted) {
      todos = todos.map(todo => ({ ...todo, completed: false }))
    } else {
      todos = todos.map(todo => ({ ...todo, completed: true }))
    }
    // 执行更新后，手动触发更新，本操作应该放在父组件中的
    _p.__dispatchUpdate()
  }

  // 观察者模式
  _p._$register = function (component) {
    updateComponents.push(component)
  }

  _p.__dispatchUpdate = function () {
    updateComponents.forEach(component => {
      component._$update()
    });
  }

  return _p
});
