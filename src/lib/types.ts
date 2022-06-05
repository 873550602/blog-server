export type objType = {
  [key: string]: any
}
type PropertiesType = {
  [key: string]:
    | PropertiesType
    | objType
    | string
    | number
    | boolean
    | any[]
    | undefined
  type?:
    | 'string'
    | 'object'
    | 'array'
    | 'null'
    | 'boolean'
    | 'number'
    | 'integer'
  // properties?: PropertiesType
  contentEncoding?: 'base64'
  contentMediaType?: 'image/png' | 'text/html' | 'application/json'
  enum?: any[]
  const?: any
  // valid number
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  // valid string
  maxLength?: number
  minLength?: number
  pattern?: string
  // valid array
  items?: objType
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  contains?: objType
  maxContains?: number
  minContains?: number
  // valid object
  maxProperties?: number
  minProperties?: number
  required?: string[]
  dependentRequired?: { [key: string]: any[] }
}
export type SchemaType = {
  $schema?: string
  $id?: string
  title?: string
  description?: string
  type:
    | 'string'
    | 'object'
    | 'array'
    | 'null'
    | 'boolean'
    | 'number'
    | 'integer'
  required?: string[]
  properties?: { [key: string]: PropertiesType }
}
export type errorType = {
  code: string
  syscall: string
}
export type ctxType = {
  render: (tempPath: string, data: objType) => void
  body: any
}
type middlewareType = (ctx: ctxType, next: () => void) => void

export type routerType = {
  [key: string]: any
  allowedMethods: () => any
  get: (url: string, middleware: middlewareType) => Promise<void>
  post: (url: string, middleware: middlewareType) => Promise<void>
  delet: (url: string, middleware: middlewareType) => Promise<void>
  put: (url: string, middleware: middlewareType) => Promise<void>
}
