import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
// import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import static_ from 'koa-static'
import path from 'path'

const app = new Koa()
import index from './routes/index.js'
import users from './routes/users.js'

// error handler
// onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(static_(path.resolve('./public')))

app.use(
  views(path.resolve('./src/views'), {
    extension: 'pug',
  })
)

// logger
app.use(async (ctx: { method: string; url: string }, next: () => any) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes()).use(index.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
