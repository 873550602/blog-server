import assert from 'assert'
import Ajv, { ErrorObject, Options } from 'ajv'
import { Context } from 'koa'
import local from 'ajv-i18n'

export interface ValidationError {
  error_description: Array<ErrorObject>
}

export const inputsValidator = (schema: object, options?: Options) => {
  assert(schema, 'schema must be provided')
  const ajv = new Ajv(options || {})
  const validate = ajv.compile(schema)

  return async (ctx: Context, next: Function) => {
    // @ts-ignore
    const data = Object.assign(
      {},
      ctx.request.query || {},
      ctx.request.body || {},
      ctx.params || {}
    )
    const isValid = validate(data)
    if (!isValid) {
      local.zh(validate.errors)
      ctx.body = {
        code: -1,
        message: 'invalid inputs',
        errorData: validate.errors?.map((item) => ({
          instancePath: item.instancePath,
          message: item.message,
        })),
      }
      //   ctx.throw(422, 'invalid inputs', { error_description: validate.errors })
    } else {
      await next()
    }
  }
}
