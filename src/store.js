NEJ.define([
  './api.js',
  './util.js'
], function (_api, _util, _p) {
  let todos = []
  const updateComponents = []
  let isNetWorking = true

  _p._$getAllTodos = function () {
    return todos
  }

  _p._$getActiveTodos = function () {
    return todos.filter(todo => !todo.isCompleted)
  }

  _p._$getCompletedTodos = function () {
    return todos.filter(todo => todo.isCompleted)
  }

  _p._$addTodo = function (label) {
    const nextId = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1
    const newTodo = { id: nextId, label, isCompleted: false }

    _p.__ajax(_api._$createNewTodo, [newTodo],
      function (data) {
        todos = [...todos, newTodo]
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      function (error) {
        console.log(error)
      }
    )
  }



  _p._$toggleTodo = function (id) {
    const beforeTodo = todos.find(todo => todo.id === id)
    const updatedTodo = {
      ...beforeTodo,
      isCompleted: !beforeTodo.isCompleted
    }

    _p.__ajax(_api._$updateById, [id, updatedTodo],
      function (data) {
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
      function (error) {
        console.log(error)
      }
    )
  }

  _p._$updateTodoLabel = function (id, label) {
    const beforeTodo = todos.find(todo => todo.id === id)
    const updatedTodo = {
      ...beforeTodo,
      label
    }

    _p.__ajax(_api._$updateById, [id, updatedTodo],
      function (data) {
        todos = todos.map(todo => {
          return id === todo.id ? updatedTodo : todo
        })
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      function (error) {
        console.log(error)
      }
    )
  }

  _p._$deleteTodo = function (id) {
    _p.__ajax(_api._$deleteById, [id],
      function (data) {
        todos = todos.filter(todo => todo.id != id)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      function (error) {
        console.log(error)
      }
    )
  }

  _p._$clearAllCompletedTodos = function () {
    const deleteTodoIds = todos.filter(t => t.isCompleted).map(t => t.id)
    _p.__ajax(_api._$deleteTodos, [deleteTodoIds],
      function (data) {
        todos = todos.filter(todo => !todo.isCompleted)
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      function (error) {
        console.log(error)
      }
    )
  }

  // 如果有一个完成，则全部完成，否则如果全部完成，则转为未完成，如果全部未完成，则转为完成
  _p._$toggleAll = function () {
    let updatedTodos = []
    const allCompleted = todos.every(todo => todo.isCompleted)
    if (allCompleted) {
      updatedTodos = todos.map(todo => ({ ...todo, isCompleted: false }))
    } else {
      updatedTodos = todos.map(todo => ({ ...todo, isCompleted: true }))
    }
    _p.__ajax(_api._$updateTodos, [updatedTodos],
      function (data) {
        todos = updatedTodos
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      function (error) {
        console.log(error)
      }
    )
  }

  // 观察者模式
  _p._$register = function (component) {
    updateComponents.push(component)
  }

  _p.__dispatchUpdate = function () {
    updateComponents.forEach(component => {
      component._$update()
    })
  }

  _p.__ajax = function (requestFunc, params, onSuccess, onError) {
    if (!isNetWorking) {
      onSuccess()
      return
    }
    params.concat({ onSuccess, onError }).reduce(function (func, param) {
      return func(param)
    }, _util._$curry(requestFunc))
  }

  // 初始化时候进行数据获取，如果数据获取不成功，即网路请求失败，则使用本地预览模式
  _p.__init = function () {
    _api._$getAllTodos({
      onSuccess: function (data) {
        isNetWorking = true
        todos = data
        // 执行更新后，手动触发更新，本操作应该放在父组件中的
        _p.__dispatchUpdate()
      },
      onError: function (error) {
        isNetWorking = false
        todos = []
        console.log('将执行本地预览机制')
      }
    })
  }

  _p.__init()

  return _p
})
