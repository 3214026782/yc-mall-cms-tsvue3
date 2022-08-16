import axios from 'axios'

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })

axios.defaults.baseURL = 'http://httpbin.org'

axios
  .get('/get', {
    params: {
      name: 'lyc',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('/post', {
    data: {
      name: 'lyc',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })

// 5.axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', {
      data: {
        name: 'lyc',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'lyc',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axios的拦截器
// fn1:请求发送成功会执行的函数
// fn2:请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    console.log('请求发送的成功')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('响应失败的拦截')
    return err
  }
)
