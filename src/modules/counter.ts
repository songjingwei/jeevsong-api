
import { Hono } from 'hono'

const counter = new Hono()

counter.get('/', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const counterValue = await stub.getCounterValue()
  console.log('counterValue: ', typeof counterValue)
  return c.json({
    value: counterValue
  })
})

counter.post('/counter/increment', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const value = await stub.increment()
  return c.text(value.toString())
})

counter.post('/counter/decrement', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const value = await stub.decrement()
  return c.text(value.toString())
})


export default counter
