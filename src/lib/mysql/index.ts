import DbClient from 'ali-mysql-client'
import config from './config.js'
const { mysqlClient } = config
export default class Mysql {
  private static _db
  static get db() {
    // 初始化数据库
    Mysql._db || (Mysql._db = new DbClient(mysqlClient))
    return Mysql._db
  }
}
