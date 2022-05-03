import UserEntity from '../entity/user.js'
import Router from 'koa-router'
import { userSchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import requestId from 'koa-requestid'
import { createUserController } from '../controller/user.js'
import { ResponseObj } from 'src/interface/index.js'
const router = new Router()

router.get('/', async (ctx: any, next: any) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.post('/login', async (ctx: { body: string }, next: any) => {
  ctx.body = 'koa2 string'
})

router.post(
  '/registry',
  inputsValidator(userSchema),
  requestId(),
  async (ctx, next: any) => {
    ctx.request.body.id = ctx.state.id;
    const r = await createUserController(ctx.request.body)
    if (r) {
      ctx.body = {
        code:0,
        message: 'ok'
      } as ResponseObj
    }else{
      ctx.body = {
        code:-1,
        message: 'error'
      } as ResponseObj
    }
  }
)

router.get('/json', async (ctx, next: any) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

export default router
