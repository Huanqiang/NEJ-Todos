NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'ui/item/list',
  'util/template/tpl',
  '../../store.js',
  'text!./index.css',
  'text!./index.html',
], function (_k, _e, _event, _list, _tpl, _store, _css, _html, _p) {
  var _pro
  // 定义一个类
  _p._$$TodoItem = _k._$klass();
  var _pro = _p._$$TodoItem._$extend(_list._$$ListItem);

  // 初始化外观
  // 此过程只会在控件第一次创建时进入
  _pro.__initXGui = (function () {
    var _seed_css = _e._$pushCSSText(_css),
      _seed_html = _tpl._$addNodeTemplate(_html);
    return function () {
      this.__seed_css = _seed_css;
      this.__seed_html = _seed_html;
    };
  })();

  // 初始化数据结构
  _pro.__initNode = function () {
    this.__super();
    this.__checked = _e._$getByClassName(this.__body, 'todo-toggle')[0]
    this.__label = _e._$getByClassName(this.__body, 'todo-label')[0]
    const removeBtn = _e._$getByClassName(this.__body, 'todo-remove')[0]
    // Bind click event to this.__onAction()
    _event._$addEvent(removeBtn, 'click', _pro.__onRemove._$bind(this));
    _event._$addEvent(this.__checked, 'click', _pro.__onToggle._$bind(this));
  };

  // 初始化操作
  _pro.__init = function () {
    this.__super()
  }

  _pro.__doBuild = function () {
    this.__body = _e._$html2node(
      _t1._$getTextTemplate('module-id-2')
    );
  }

  _pro.__doRefresh = function (_todo) {
    console.log('_doRefresh', _todo)
    this.__todo = _todo
    this.__label.innerHTML = _todo.label
    this.__checked.checked = _todo.isCompleted
  }

  // 销毁操作
  _pro.__destroy = function () {
    this.__super()
    console.log('正在销毁本 Item')
  }


  _pro.__onRemove = function (event) {
    console.log('__onRemove', this.__todo.id)

    const _node = _event._$getElement(event, 'd:action');
    if (!_node) return;
    // 操作
    const action = _e._$dataset(_node, 'action')
    console.log(action)

    _store._$deleteTodo(this.__todo.id)
  }

  _pro.__onToggle = function () {
    console.log('__onToggle', this.__todo.id)
    _store._$toggleTodo(this.__todo.id)
  }

  // 公有方法
  _pro._$publicMethod = function () {
    console.log('我是一个公有方法')
  }



  return _p;
});