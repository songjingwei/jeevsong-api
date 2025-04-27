import { Hono } from 'hono'
import { cors } from 'hono/cors'
import LikeCounter from './models/LikeCounter'
import user from './modules/user'
import counter from './modules/counter'

export { LikeCounter }


const allowedOrigins = [
  'https://jeevsong-cv.pages.dev',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]

type Bindings = {
  LIKE_COUNTER: DurableObjectNamespace<LikeCounter>
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.use('*', cors({
  origin: (origin: string) => {
    // 开发环境允许所有本地地址
    if (origin.startsWith('http://localhost')) {
      return origin
    }
    if (origin.startsWith('http://127.0.0.1')) {
      return origin
    }

    // 检查域名是否在允许列表中
    if (allowedOrigins.includes(origin)) {
      return origin
    }

    // 默认拒绝未匹配的域名
    return ''
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Custom-Header'],
  maxAge: 600, // 预检请求缓存时间（秒）
  credentials: true // 允许携带 Cookie
}))


app.route('/users', user)
app.route('/counter', counter)

export default app
