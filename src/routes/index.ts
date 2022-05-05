import Router from 'koa-router'
import { userLoginSchema, userSchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import requestId from 'koa-requestid'
import { createUserController, loginController } from '../controller/user.js'
import passport from 'koa-passport'
const router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.post('/login', inputsValidator(userLoginSchema), (ctx, next) => {
  return  passport.authenticate("local", (err, user) => {
    if (!user) {
      ctx.body = {
        code: -1,
        message: err
      }
    } else {
      ctx.body = {
        code: 0,
        message: "ok",
        data: user
      }
      return ctx.login(user)
    }
  })(ctx, next)
})

router.post(
  '/registry',
  inputsValidator(userSchema),
  requestId(),
  async (ctx) => {
    ctx.request.body.id = ctx.state.id;
    ctx.body = await createUserController(ctx.request.body)
  }
)

router.get('/test', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

export default router
