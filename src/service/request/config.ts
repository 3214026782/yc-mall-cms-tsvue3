// 1、手动切换不同环境
// const BASE_URL = 'http://lyc.org/dev'
// const BASE_NAME = 'lyc'

// const BASE_URL = 'http://lyc.org/prod'
// const BASE_NAME = 'hhh'

// const BASE_URL = 'http://lyc.org/test'
// const BASE_NAME = 'test'

// 2.根据process.env.NODE_ENV
// 开发环境：development
// 生成环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://lyc.org/prod'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://lyc.org/test'
}

export { BASE_URL, TIME_OUT }
