import { Hono } from 'hono'

const user = new Hono()

user.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id, name: '用户详情' })
})

export default user



