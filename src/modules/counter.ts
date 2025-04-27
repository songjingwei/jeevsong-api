import { Hono } from 'hono'

const counter = new Hono()

counter.get('/', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const counterValue = await stub.getCounterValue()
  console.log('counterValue: ', typeof counterValue)
  return c.json({
    ret: 0,
    err: '',
    data: counterValue,
  })
})

counter.post('/increment', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const value = await stub.increment()
  return c.json({
    ret: 0,
    err: '',
    data: value,
  })
})

counter.post('/decrement', async (c) => {
  const env = c.env
  const id = env.LIKE_COUNTER.idFromName('counter')
  const stub = env.LIKE_COUNTER.get(id)
  const value = await stub.decrement()
  return c.json({
    ret: 0,
    err: '',
    data: value,
  })
})


export default counter
