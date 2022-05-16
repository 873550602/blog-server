import requestId from 'koa-requestid'
import Router from 'koa-router'
import { createCommentSchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import CommentController from '../controller/comment.js'

const router = new Router({ prefix: '/comment' })

router.post('/create', requestId(), inputsValidator(createCommentSchema), async (ctx) => {
    const id = ctx.state.id;
    ctx.body = await CommentController.createComment(id, ctx.request.body)
})

export default router