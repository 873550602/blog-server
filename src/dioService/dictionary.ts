import Mysql from '../lib/mysql/index.js'
import TableName from '../lib/tableNames.js'

export default class DictionaryDio {
  static async create(dictionary: DictionaryForm): Promise<boolean> {
    const r = await Mysql.db.insert(TableName.dictionary, dictionary).execute()
    return r.affectedRows === 1
  }
  static async changeById(dictionary: changeDictionaryForm): Promise<boolean> {
    const r = await Mysql.db
      .update(TableName.dictionary, dictionary)
      .where('id', dictionary.id)
      .execute()
    return r.affectedRows === 1
  }
  static async deleteById(id: string): Promise<boolean> {
    const r = await Mysql.db
      .delete(TableName.dictionary)
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }
}
