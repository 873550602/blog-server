import Router from 'koa-router'
import UserController from '../controller/user.js'
import { inputsValidator } from '../lib/middleware.js'
import { changePasswordSchema, changeUserInfoSchema, followUserSchema, likeArticleSchema } from '../lib/schemaList.js'

const router = new Router({ prefix: '/users' })

router.post('/changePassword', inputsValidator(changePasswordSchema), async (ctx) => {
  const { id, newPassword, oldPassword } = ctx.request.body
  const r = await UserController.changePasswordById(id, newPassword, oldPassword)
  if (r.code === 0) {
    ctx.logout()
  }
  ctx.body = r
})

router.get('/getUserInfo/:id', async (ctx) => {
  ctx.body = await UserController.getUserInfoById(ctx.params.id)
})

router.post('/saveAvatar/:id', async (ctx) => {
  const id = ctx.params.id;
  const file = ctx.request.files['file']
  ctx.body = await UserController.saveAvatarById(id, file, ctx.origin)
})

router.post('/changeInfoById', inputsValidator(changeUserInfoSchema), async (ctx) => {
  const { id } = ctx.request.body
  delete ctx.request.body.id
  ctx.body = await UserController.changeUserInfoById(id, ctx.request.body)

})

router.get('/followUser/:followedId', inputsValidator(followUserSchema), async (ctx) => {
  const followedId = ctx.params.followedId
  const userId = ctx.state.user.id
  ctx.body = await UserController.followUserById(userId, followedId);
})

router.get('/likeArticle/:articleId', inputsValidator(likeArticleSchema), async (ctx) => {
  const articleId = ctx.params.articleId
  const userId = ctx.state.user.id
  ctx.body = await UserController.likeArticleById(userId, articleId);
})

export default router
