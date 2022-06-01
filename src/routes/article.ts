import requestId from 'koa-requestid'
import Router from 'koa-router'
import ArticleController from '../controller/article.js'
import { inputsValidator } from '../lib/middleware.js'
import {
  createArticleSchema,
  getArticleByIdSchema,
  getArticlesSchema,
  getCommentByIdSchema,
  incrementReadingByIdSchema,
} from '../lib/schemaList.js'

const router = new Router({ prefix: '/article' })

router.post(
  '/create',
  inputsValidator(createArticleSchema),
  requestId(),
  async (ctx) => {
    const id = ctx.state.id
    const author = ctx.state.user.id
    ctx.body = await ArticleController.createArticle(
      id,
      author,
      ctx.request.body
    )
  }
)

router.post('/getList', inputsValidator(getArticlesSchema), async (ctx) => {
  const params = ctx.request.body
  const label = params.object.label
  delete params.object
  const page = params

  ctx.body = await ArticleController.getArticlePageByLabel(label, page)
})

router.get(
  '/getArticle/:id',
  inputsValidator(getArticleByIdSchema),
  async (ctx) => {
    const id = ctx.params.id
    ctx.body = await ArticleController.getArticleInfoById(id)
  }
)
router.get(
  '/getComment/:id',
  inputsValidator(getCommentByIdSchema),
  async (ctx) => {
    const id = ctx.params.id
    ctx.body = await ArticleController.getCommentsById(id)
  }
)

router.get(
  '/incrementReading/:id',
  inputsValidator(incrementReadingByIdSchema),
  async (ctx) => {
    const id = ctx.params.id
    ctx.body = await ArticleController.changeArticleReadingById(id)
  }
)

export default router
