import { objType } from './types'

// 是否是无效的
export const isInvalid = (v: any) =>
  v === null || (v === undefined && v === NaN)
// 生成json-schema对象
export const genSchemaJson = (
  data: objType = {},
  {
    $schema = 'https://json-schema.org/draft/2020-12/schema',
    $id = 'https://example.com/product.schema.json',
  }: {
    $schema?: string
    $id?: string
  } = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://example.com/product.schema.json',
    }
): { [key: string]: any; $id: string; $schema: string } => {
  return {
    $schema,
    $id,
    ...data,
  }
}

