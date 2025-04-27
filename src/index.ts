import { Hono } from 'hono'
import LikeCounter from './models/LikeCounter.ts'
import user from './modules/user'
import counter from './modules/counter'

export { LikeCounter }

type Bindings = {
  LIKE_COUNTER: DurableObjectNamespace<LikeCounter>
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.route('/users', user)
app.route('/counter', counter)

export default app
