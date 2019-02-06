NEJ.define(['./api.js'], function(_api, _p) {
  let todos = []

  const updateComponents = []

  // _p._$getAllTodos = function (func) {
  //   _api._$getAllTodos({
  //     onSuccess: function (data) {
  //       todos = data
  //       func(data)
  //     }
  //   })
  //   // return todos
  // }

  _p._$getAllTodos = function() {
    return todos
  }

  _p._$getActiveTodos = function() {
    return todos.filter(todo => !todo.isCompleted)
  }

  _p._$getCompletedTodos = function() {
    return todos.filter(todo => todo.isCompleted)
  }

  _p._$addTodo = function(label) {
    const newTodo = { id: todos[todos.length - 1].id + 1, label, isCompleted: false }

    _api._$createNewTodo(newTodo, {
      onSuccess: function(data) {
        console.log('createNewTodo', data)
        todos = [...todos, newTodo]
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function(error) {
        console.log(error)
      }
    })
  }

  _p._$toggleTodo = function(id) {
    const beforeTodo = todos.find(todo => todo.id === id)
    const updatedTodo = {
      ...beforeTodo,
      isCompleted: !beforeTodo.isCompleted
    }

    _api._$updateById(id, updatedTodo, {
      onSuccess: function(data) {
        console.log('updateById', data)
        todos = todos.map(todo => {
          return id === todo.id
            ? {
                ...todo,
                isCompleted: !todo.isCompleted
              }
            : todo
        })
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function(error) {
        console.log(error)
      }
    })
  }

  _p._$deleteTodo = function(id) {
    _api._$deleteById(id, {
      onSuccess: function(data) {
        todos = todos.filter(todo => todo.id != id)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function(error) {
        console.log(error)
      }
    })
  }

  _p._$clearAllCompletedTodos = function() {
    const deleteTodoIds = todos.filter(t => t.isCompleted).map(t => t.id)
    _api._$deleteTodos(deleteTodoIds, {
      onSuccess: function(data) {
        console.log('deleteTodos', data)
        todos = todos.filter(todo => !todo.isCompleted)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function(error) {
        console.log(error)
      }
    })
  }

  // 如果有一个完成，则全部完成，否则如果全部完成，则转为未完成，如果全部未完成，则转为完成
  _p._$toggleAll = function() {
    // const hasCompleted = todos.some(todo => todo.isCompleted)
    let updatedTodos = []
    const allCompleted = todos.every(todo => todo.isCompleted)
    if (allCompleted) {
      updatedTodos = todos.map(todo => ({ ...todo, isCompleted: false }))
    } else {
      updatedTodos = todos.map(todo => ({ ...todo, isCompleted: true }))
    }
    console.log('updatedTodos', updatedTodos)
    _api._$updateTodos(updatedTodos, {
      onSuccess: function(data) {
        console.log('deleteTodos', data)
        todos = updatedTodos
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function(error) {
        console.log(error)
      }
    })
  }

  // 观察者模式
  _p._$register = function(component) {
    updateComponents.push(component)
  }

  _p.__dispatchUpdate = function() {
    updateComponents.forEach(component => {
      component._$update()
    })
  }

  _api._$getAllTodos({
    onSuccess: function(data) {
      todos = data
      // 执行更新后，手动触发更新，本操作应该放在父组件中的
      _p.__dispatchUpdate()
    }
  })

  return _p
})
