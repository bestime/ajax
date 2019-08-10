#### 安装
```javascript
npm i bestime-ajax
```

#### 引入到项目
```javascript
// 方式一
const ajax = require('bestime-ajax')

// 方式二
import ajax from 'bestime-ajax'

// 方式三
<script src="https://cdn.jsdelivr.net/npm/bestime-ajax@latest/ajax.js"></script>
```

#### 参数详解
|    参数  |   类型   |  必填  |    默认   |  描述  |
| -------- | -----:   | -----: | -----:    | -----:  |
| url      | String   | `是`   | undefined | 请求的地址   |
| data     | Object   |  否    | undefined | 发送的数据 |
| success  | Function |  否    | undefined | 成功回调   |
| error    | Function |  否    | undefined | 失败回调   |
| timeout  | Number   |  否    | 1000 * 10 | 超时时间，单位（毫秒） |

#### 实例化对象
|    参数  |   类型   |  描述  |
| -------- | -----:   | -----:  |
| abort    | Function | 终止ajax   |

#### GET请求
```javascript
var demo = ajax({
  url: 'http://192.168.0.224:9997/get?name=bestime',
  data: {
    name: 'bestime',
    job: 'web前端',
    dp: [1,2]
  },
  timeout: 1000 * 10,
  success: function (res) {
    console.log('成功', res)
  },
  error: function (err) {
    console.log('失败', err)
  }
})

demo.abort(); // 可终止请求
```


#### POST请求
```javascript
var demo = ajax({
  url: 'http://192.168.0.224:9997/post',
  type: 'POST',
  data: {
    name: 'bestime',
    job: 'web前端',
    other: ['张三', '李四', '王五']
  },
  success: function (res) {
    console.log('成功', res)
  },
  error: function (err) {
    console.log('失败', err)
  },
  timeout: 2000,
})

demo.abort(); // 可终止请求
```
