;!function (global) {
  // 导出方法
  function _export (name, handle) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = handle;
    } else if (typeof define === 'function' && define.amd) {
      define([], function () {
        return handle;
      });
    } else {
      global[name] = handle;
    }
  }

  function param(g){function f(c,a){a="function"===typeof a?a():a;a=void 0===a||null===a||"undefined"===typeof a?"":a;e[e.length]=encodeURIComponent(c)+"="+encodeURIComponent(a)}function d(c,a){var b;if(c)switch(getType(a)){case "Array":for(b=0;b<a.length;b++)d(c+"["+("object"===typeof a[b]&&a[b]?b:"")+"]",a[b]);break;case "Object":for(b in a)d(c+"["+b+"]",a[b]);break;default:f(c,a)}else switch(getType(a)){case "String":case "Object":for(b in a)d(b,a[b]);break;case "Array":for(b=0;b<a.length;b++)f(a[b].name,
    a[b].value)}}var e=[];d("",g);return e.join("&")};

  function tempFunc () {}

  function getType (data) {
    return Object.prototype.toString.call(data).split(' ')[1].slice(0, -1)
  }

  function _Function (data) {
    return getType(data)==='Function' ? data : tempFunc
  }
  
  function ajax (opt) {
    var url = opt.url
    var type = opt.type || 'GET'
    var data = param(opt.data)
    var success = _Function(opt.success)
    var error = _Function(opt.error)
    var timeout = Number(opt.timeout) || 1000 * 10
    timeout = timeout < 1000 ? 1000 : timeout
    
    // 执行ajax
    var xhr, timer;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    if (type === 'GET') {
      url += (/\?/g.test(url) ? '&' : '?') + data;
      url += (data ? '&' : '') + 'ajax=' + +new Date()
      data = ''
    }

    xhr.open(type, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    
    xhr.onreadystatechange = function() {
      if ( xhr.readyState == 4 ) {
        if ( xhr.status == 200 ) {
          var res = xhr.responseText 
          try { res = JSON.parse(res) } catch (e) {}
          success(res);
        } else {
          error(xhr);
        }
      }
    }
    
    // 取消请求
    function cancel (msg) {
      xhr.msg = msg
      xhr.abort()
    }

    // 处理超时
    timer = setTimeout(function () {
      cancel('time out')
    }, timeout)

    return {
      // 终止请求
      abort: function () {
        clearTimeout(timer)
        cancel('cancel')
      }
    }
  };
  
  _export('ajax', ajax)
} (this);