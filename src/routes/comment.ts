import requestId from 'koa-requestid'
import Router from 'koa-router'
import { createCommentSchema, deleteCommentSchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import CommentController from '../controller/comment.js'

const router = new Router({ prefix: '/comment' })

router.post(
  '/create',
  requestId(),
  inputsValidator(createCommentSchema),
  async (ctx) => {
    const id = ctx.state.id
    ctx.body = await CommentController.createComment(id, ctx.request.body)
  }
)

router.get(
  '/delete/:commentId',
  inputsValidator(deleteCommentSchema),
  async (ctx) => {
    const id = ctx.state.user.id
    const { commentId } = ctx.params
    ctx.body = await CommentController.deleteCommentById(id, commentId, false)
  }
)

router.get(
  '/deleteWithSoft/:commentId',
  inputsValidator(deleteCommentSchema),
  async (ctx) => {
    const id = ctx.state.user.id
    const { commentId } = ctx.params
    ctx.body = await CommentController.deleteCommentById(id, commentId, true)
  }
)

router.get(
  '/backComment/:commentId',
  inputsValidator(deleteCommentSchema),
  async (ctx) => {
    const id = ctx.state.user.id
    const { commentId } = ctx.params
    ctx.body = await CommentController.backCommentById(id, commentId)
  }
)

export default router
