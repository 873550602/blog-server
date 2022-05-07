import Router from 'koa-router'
import { changePasswordByIdController, changeUserInfoByIdController, getUserInfoByIdController, saveAvatarByIdController } from '../controller/user.js'
import { inputsValidator } from '../lib/middleware.js'
import { changePasswordSchema, changeUserInfoSchema } from '../lib/schemaList.js'

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

router.get('/getUserInfo/:id', async (ctx) => {
  ctx.body = await getUserInfoByIdController(ctx.params.id)
})

router.post('/saveAvatar/:id', async (ctx) => {
  const id = ctx.params.id;
  const file = ctx.request.files['file']
  ctx.body = await saveAvatarByIdController(id, file, ctx.origin)
})

router.post('/changeInfoById', inputsValidator(changeUserInfoSchema), async (ctx) => {
  const { id } = ctx.request.body
  delete ctx.request.body.id
  ctx.body = await changeUserInfoByIdController(id, ctx.request.body)
  
})

export default router
