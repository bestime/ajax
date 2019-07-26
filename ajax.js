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

  // 序列化，复制的自己的ParamData仓库
  function param (data) {
    var res = [];
    function addOne (key, value) {
      value = typeof value === 'function' ? value() : value;
      value = value === undefined || value === null || typeof value === 'undefined' ? '' : value
      res[res.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }    
    buildParam('', data)
    function buildParam (prefix, item) {
      var index, objKey;
      if(prefix) {
        switch (getType(item)) {
          case 'Array':
            for(index=0; index<item.length; index++) {
              buildParam(prefix + '['+ (typeof item[index]==='object' && item[index] ? index : '') +']', item[index])
            }
            break;
          case 'Object':
            for(objKey in item) {
              buildParam(prefix + '[' + objKey + ']', item[objKey])
            }
            break;
          default:
            addOne(prefix, item)
        }
      } else {
        switch (getType(item)) {
          case 'String':
          case 'Object':
            for(objKey in item) {
              buildParam(objKey, item[objKey])
            }
            break;
          case 'Array':
            for(index=0; index<item.length; index++) {
              addOne(item[index].name, item[index].value)
            }
            break;
        }
      }
    }    
    return res.join('&')
  };

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

    if (type === 'GET' && data) {
			url += (/\?/g.test(url) ? '&' : '?') + data
    }
    
    // 执行ajax
    var xhr, timer;
		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }	
		
    xhr.open(type, url, true);
    
		if (type == 'GET') {
			xhr.send();
		} else {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}
		
		xhr.onreadystatechange = function() {
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
          var res = xhr.responseText 
          try {
            res = JSON.parse(res)
          } catch (e) {}
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