import { generateInitResponse } from '../lib/utils.js'
import DictionaryDio from '../dioService/dictionary.js'

export default class DictionaryController {
  static async create(dictionary: DictionaryForm): Promise<ResponseObj<null>> {
    const r = await DictionaryDio.create(dictionary)
    if (r) {
      return generateInitResponse(0, 'ok')
    } else {
      return generateInitResponse(-1, 'error')
    }
  }
}
