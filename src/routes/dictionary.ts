import Router from 'koa-router'
import { createDictionarySchema } from '../lib/schemaList.js'
import { inputsValidator } from '../lib/middleware.js'
import DictionaryController from '../controller/dictionary.js'

const router = new Router({ prefix: '/dictionary' })

router.post('/create', inputsValidator(createDictionarySchema), async (ctx) => {
  ctx.body = await DictionaryController.create(ctx.request.body)
})

export default router
