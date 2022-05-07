import Router from 'koa-router'
import { userLoginSchema, userSchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import requestId from 'koa-requestid'
import { createUserController, loginController } from '../controller/user.js'
import passport from 'koa-passport'
import { generateInitResponse } from '../lib/utils.js'
import { getUserInfoByIdDio } from '../dioService/user.js'
const router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.post('/login', inputsValidator(userLoginSchema), (ctx, next) => {
  return passport.authenticate("local", (err, user) => {
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

router.get('/logout/:id', async(ctx) => {
  const { id } = ctx.params
  const r = await getUserInfoByIdDio(id)
  if (!r) {
    ctx.body = generateInitResponse(-1, "id无效")
    return
  }
  ctx.logout()
  ctx.body = generateInitResponse(0, "ok")
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
