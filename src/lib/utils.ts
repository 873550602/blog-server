import { ResponseObj } from 'src/interface'
import { objType } from './types'
import fs from 'fs'

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

// 生成格式化的response
export const generateInitResponse = (code: number, message: string, data?: any): ResponseObj => ({ code, message, data })

/**
 * 保持图片到指定路径
 * @param path 保存到服务器路径
 * @param file 文件对象
 * @param name 自定义文件名
 * @param isCatch 是否开启缓存策略
 * @returns 文件名
 */
export const saveFile = (path: string, file: any, name?: string, isCatch: boolean = false): boolean | string => {
  name || (name = Date.now() + "");
  const ext = file.name.split('.')[1]
  const filename = name + '.' + ext
  const newPath = path + "/" + filename
  try {
    fs.renameSync(file.path, newPath);
  } catch (error) {
    // must logger
    return false
  }
  // 控制缓存
  const dt = Date.now().toString()
  return isCatch ? filename + '?' + dt : filename
}