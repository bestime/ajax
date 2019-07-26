# GET请求
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


# POST请求
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
