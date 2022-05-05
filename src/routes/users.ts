import Router from 'koa-router'
import { changePasswordByIdController } from '../controller/user.js'
import { inputsValidator } from '../lib/middleware.js'
import { changePasswordSchema } from '../lib/schemaList.js'

const router = new Router()

router.prefix('/users')

router.post('/changePassword', inputsValidator(changePasswordSchema), async (ctx) => {
  const { id, newPassword, oldPassword } = ctx.request.body
  const r = await changePasswordByIdController(id, newPassword, oldPassword)
  if (r.code === 0) {
    ctx.logout()
  }
  ctx.body = r
})

router.get('/bar', function (ctx: any, next: any) {
  ctx.body = 'this is a users/bar response'
})

export default router
