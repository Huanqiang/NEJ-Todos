NEJ.define([
  'base/element',
  'base/event',
  'util/template/tpl',
  '../components/Item/index.js',
  './store.js'
], function (_e, _event, _tpl, _item, _store, _p) {
  const _pro = _p
  const _count = _e._$get("todos-count")
  const __toggle_all = _e._$getByClassName('app', 'toggle-all')[0]
  const __input = _e._$getByClassName('app', 'add-todo')[0]
  const __filter_btns = _e._$getByClassName('app', 'filter')
  const __clear_btn = _e._$getByClassName('app', 'clear')[0]

  _pro.__refresh = function (todos) {
    _pro.__refreshCount(todos.length)
    _pro.__refreshItems(todos)
  }

  _pro.__refreshCount = function (num) {
    _count.innerText = num
  }

  _pro.__refreshItems = function (todos) {
    _e._$clearChildren("todos-view")

    const _list = _tpl._$getItemTemplate(
      todos, _item._$$TodoItem, {
        parent: 'todos-view',
        ontoggle: function (_data) {
          // TODO
          console.log('ontoggle', _data)
        },
        ondelete: function (_data) {
          // TODO
          console.log('ondelete', _data)
        }
      }
    );

    // _item._$$TodoItem._$recycle()
  }

  _pro.__addNewTodo = function (event) {
    if (event.keyCode === 13) {
      _store._$addTodo(__input.value)
      __input.value = ''
    }
  }

  _pro.__getAllTodos = function () {
    _pro.__switch_filter('all')
  }

  _pro.__getActiveTodos = function () {
    _pro.__switch_filter('active')
  }

  _pro.__getCompletedTodos = function () {
    _pro.__switch_filter('completed')
  }

  _pro.__toggleAllTodos = function () {
    console.log('__toggleAllTodos')
    _store._$toggleAll()
  }

  _pro.__clearTodosCompleted = function () {
    _store._$clearAllCompletedTodos()
  }

  //  手动改变filter btn 的样式，并更新数据
  _pro.__switch_filter = function (state) {
    _pro.__filter_state = state
    switch (state) {
      case 'all':
        _pro.__refresh(_store._$getAllTodos())
        _e._$addClassName(__filter_btns[0], 'select');
        _e._$delClassName(__filter_btns[1], 'select');
        _e._$delClassName(__filter_btns[2], 'select');
        break;
      case 'active':
        _pro.__refresh(_store._$getActiveTodos())
        _e._$delClassName(__filter_btns[0], 'select');
        _e._$addClassName(__filter_btns[1], 'select');
        _e._$delClassName(__filter_btns[2], 'select');
        break;
      case 'completed':
        _pro.__refresh(_store._$getCompletedTodos())
        _e._$delClassName(__filter_btns[0], 'select');
        _e._$delClassName(__filter_btns[1], 'select');
        _e._$addClassName(__filter_btns[2], 'select');
        break;
      default:
        break;
    }
  }

  _pro.__init = function () {
    // 创建组件
    _pro.__refresh(_store._$getAllTodos())
    _pro.__filter_state = 'all'
    _event._$addEvent(__toggle_all, 'click', _pro.__toggleAllTodos);
    _event._$addEvent(__input, 'keydown', _pro.__addNewTodo);
    _event._$addEvent(__filter_btns[0], 'click', _pro.__getAllTodos);
    _event._$addEvent(__filter_btns[1], 'click', _pro.__getActiveTodos);
    _event._$addEvent(__filter_btns[2], 'click', _pro.__getCompletedTodos);
    _event._$addEvent(__clear_btn, 'click', _pro.__clearTodosCompleted);

    // 注册到 store 里，接受每次 todo 改变的更新。
    _store._$register(_p)
  }

  _pro._$update = function () {
    _pro.__switch_filter(_pro.__filter_state)
  }

  _pro.__init()
});