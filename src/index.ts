import { Hono } from 'hono'
import user from './modules/user'

const app = new Hono().basePath('/api')

app.route('/users', user)


export default app
