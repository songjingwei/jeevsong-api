import { Hono } from 'hono'
import user from './modules/user'
import counter from './modules/counter'
import { DurableObject, DurableObjectState } from 'cloudflare:workers'

export class LikeCounter extends DurableObject {
  // In-memory state
  value = 0

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    ctx.blockConcurrencyWhile(async () => {
      // After initialization, future reads do not need to access storage.
      this.value = (await ctx.storage.get('value')) || 0
    })
  }

  async getCounterValue() {
    return this.value
  }

  async increment(amount = 1): Promise<number> {
    this.value += amount
    await this.ctx.storage.put('value', this.value)
    return this.value
  }

  async decrement(amount = 1): Promise<number> {
    this.value -= amount
    await this.ctx.storage.put('value', this.value)
    return this.value
  }
}

type Bindings = {
  LIKE_COUNTER: DurableObjectNamespace<LikeCounter>
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.route('/users', user)
app.route('/counter', counter)

export default app
