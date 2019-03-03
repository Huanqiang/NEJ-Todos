NEJ.define([

], function (_p) {

  _p._$curry = function (fn, ...args) {
    // 2. 利用 function.length 判断 fn 函数可接收参数的个数
    if (args.length >= fn.length) {
      // 3. 若已接收到的参数比 fn 函数规定的参数多了，则执行 fn 函数；
      return fn(...args)
      // return fn.call(this, ...args)
    } else {
      // 4. 若参数不够，则返回一个函数继续接受参数，并递归 curry 函数；
      return function (...params) {
        return _p._$curry(fn, ...args, ...params)
      }
    }
  }

  return _p
})
