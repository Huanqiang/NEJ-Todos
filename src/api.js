NEJ.define(['util/ajax/xdr'], function(_ajax, _p) {
  'use strict'
  const _pro = _p
  const path = 'http://localhost:3000'

  _pro._$getAllTodos = function({ onSuccess, onError }) {
    _ajax._$request(path + '/api/todos', {
      sync: false,
      type: 'json',
      method: 'GET',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  _pro._$createNewTodo = function(todo, { onSuccess, onError }) {
    console.log(todo)
    _ajax._$request(path + '/api/todos', {
      sync: false,
      data: JSON.stringify(todo),
      type: 'json',
      method: 'POST',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  _pro._$updateById = function(id, todo, { onSuccess, onError }) {
    _ajax._$request(path + '/api/todos/update', {
      sync: false,
      data: JSON.stringify(todo),
      query: { id: id },
      type: 'json',
      method: 'POST',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  _pro._$updateTodos = function(todos, { onSuccess, onError }) {
    _ajax._$request(path + '/api/todos/update/list', {
      sync: false,
      data: JSON.stringify(todos),
      type: 'json',
      method: 'POST',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  _pro._$deleteById = function(id, { onSuccess, onError }) {
    _ajax._$request(path + '/api/todos', {
      sync: false,
      query: { ids: JSON.stringify([id]) },
      type: 'json',
      method: 'DELETE',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  _pro._$deleteTodos = function(ids, { onSuccess, onError }) {
    _ajax._$request(path + '/api/todos', {
      sync: false,
      query: { ids: JSON.stringify(ids) },
      type: 'json',
      method: 'DELETE',
      onload: function(_result) {
        // TODO
        onSuccess && onSuccess(_result)
      },
      onerror: function(_error) {
        // TODO
        onError && onError(_error)
      }
    })
  }

  return _p
})
