import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:8080/'

// 创建axios实例
let service = axios.create({
  baseURL: baseURL,
  timeout: 3000 // 请求超时时间
})

// 添加request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return error.response
  }
)

function get (url, params = {}, token = '') {
  return service({
    url,
    method: 'get',
    auth: {
      username: token,
      password: ''
    },
    params
  })
}

// 封装post请求
function post (url, data = {}, token = '') {
  // 默认配置
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    auth: {
      username: token,
      password: ''
    },
    data: data
  }
  return service(sendObject)
}

// 封装put方法
function put (url, data = {}, token = '') {
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    auth: {
      username: token,
      password: ''
    },
    data: JSON.stringify(data)
  })
}

export default {
  get,
  post,
  put,
  baseURL
}
