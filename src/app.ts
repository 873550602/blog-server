import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
// import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import formData from 'koa-formidable'
import logger from 'koa-logger'
import static_ from 'koa-static'
import path from 'path'
import session from 'koa-session'
import passport from 'koa-passport'
import sysConfig from '../sysConfig.js'
import LocalStrategy from 'passport-local'

import index from './routes/index.js'
import users from './routes/users.js'
import { loginController } from './controller/user.js'
import { User } from './interface/index.js'


const app = new Koa()

// 设置session
app.keys = ['some secret hurr'];
const sessionConfig = {
  key: 'koa.sess', /** (string) cookie key (默认是 koa.sess) */
  /** (number || 'session') maxAge时间单位 ms (默认是 1 days) */
  /** 'session'当session/browser被关闭则cookie过期 */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 1000 * 60 * 60,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean)如果是 true, 在同一个请求中设置相同名称的所有 Cookie（无论路径或域）是否在设置此Cookie 时从 Set-Cookie 消息头中过滤掉. (默认 true) */
  httpOnly: true, /** (boolean) 表示 cookie 是否仅通过 HTTP(S) 发送，, 且不提供给客户端 JavaScript (default true) */
  signed: true, /** (boolean) 是否要对 cookie 进行签名 (默认 true) */
  rolling: false, /** (boolean) 强制在每个响应上设置会话标识符 cookie。 过期重置为原来的maxAge，重置过期倒计时。 (默认 is false) */
  renew: false, /** (boolean) 当会话即将过期时更新会话，因此我们可以始终保持用户登录。 (默认 is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: false, /** (string) 表示该 cookie 是否为 "相同站点" cookie (默认为 false).  */
};
app.use(session(sessionConfig, app))

// 鉴权
passport.serializeUser(function (user: any, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id: string, done) {
  try {
    done(null, id)
  } catch (err) {
    done(err)
  }
})

passport.use(new LocalStrategy.Strategy({
  usernameField: 'account',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password'
}, async (account, password, done) => {
  const r = await loginController(account, password)
  if (r.code === 0) {
    done(null, r.data)
  } else {
    done("登录失败，用户名或密码错误", false)
  }
}))


app.use(passport.initialize())
app.use(passport.session())

// error handler
// onerror(app)

app.use(formData()) // 必须放在bodyparser上面
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    formLimit: (3 * 1024) + "kb"
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
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 登录认证管理
app.use(async (ctx, next) => {
  const originalUrl = ctx.originalUrl
  // 认为不需要登录认证
  if (sysConfig.authentication.whiteList.includes(originalUrl)) {
    await next()
  } else {
    // 登录认证
    if (ctx.isAuthenticated()) {
      await next()
    } else {
      ctx.throw(401, "该用户没有登录，请登录后重试")
    }
  }
})
// routes
app.use(index.routes()).use(index.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export { app as default, passport }
