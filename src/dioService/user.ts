import TableName from '../lib/tableNames.js'
import Mysql from '../lib/mysql/index.js'
import { deSerializeSqlData, enSerializeSqlData } from '../lib/utils.js'
type TransObj = { trans?: any }
export default class UserDio {
  /**
   * 创建用户
   */
  static async createUser(user: User): Promise<boolean> {
    const _user: any = {
      ...enSerializeSqlData(user, ['labels']),
      createTime: Date.now(),
    }
    const r = await Mysql.db.insert(TableName.user, _user).execute()
    return r.affectedRows === 1
  }
  /**
   * 删除用户
   */
  static async deleteUserById(id: string): Promise<boolean> {
    const r = await Mysql.db.delete(TableName.user).where('id', id).execute()
    return r.affectedRows === 1
  }

  /**
   * 通过id获取用户
   */
  static async getUserInfoById(
    id: string,
    fields: string[] | string = '*'
  ): Promise<User | undefined> {
    if (Array.isArray(fields)) fields = fields.join(',')
    const r = await Mysql.db
      .select(fields)
      .from(TableName.user)
      .where('id', id)
      .queryRow()
    return deSerializeSqlData(r, [
      'labels',
      'likes',
      'collects',
      'followeds',
      'follows',
    ])
  }
  /**
   * 通过id获取已关注的用户
   */
  static async getFollowsById(id: string): Promise<string[] | undefined> {
    const r = await UserDio.getUserInfoById(id, ['follows'])
    return r?.follows
  }
  /**
   * 通过id获取已点赞的文章或评论
   */
  static async getLikesById(id: string): Promise<string[] | undefined> {
    const r = await UserDio.getUserInfoById(id, ['likes'])
    return r?.likes
  }
  /**
   * 通过id获取被关注的用户
   */
  static async getFollowedsById(id: string): Promise<string[] | undefined> {
    const r = await UserDio.getUserInfoById(id, ['followeds'])
    if (r) {
      return r.followeds
    } else {
      return undefined
    }
  }

  /**
   * 登录认证
   */
  static async login(
    account: string,
    password: string
  ): Promise<User | undefined> {
    const r = await Mysql.db
      .select('*')
      .from(TableName.user)
      .where('account', account)
      .where('password', password)
      .queryRow()
    return deSerializeSqlData(r, ['likes'])
  }

  /**
   *
   * 通过id修改密码
   */
  static async changePasswordById(
    id: string,
    password: string
  ): Promise<boolean> {
    const r = await Mysql.db
      .update(TableName.user, { password })
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }

  /**
   * 通过id修改普通信息
   */
  static async changeUserInfoById(
    id: string,
    info: ChangeUserForm,
    { trans }: TransObj = {}
  ): Promise<boolean> {
    const db = trans || Mysql.db
    const info_ = enSerializeSqlData(info, [
      'labels',
      'likes',
      'collects',
      'follows',
      'followeds',
    ])
    const r = await db.update(TableName.user, info_).where('id', id).execute()
    return r.affectedRows === 1
  }

  /**
   *
   * 通过id存储头像地址
   */
  static async saveAvatarById(id: string, avatar: string): Promise<boolean> {
    const r = await Mysql.db
      .update(TableName.user, { avatar })
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }
  /**
   * 通过id获取头像路径
   */
  static async getAvatarById(id: string): Promise<string | undefined> {
    const r = await Mysql.db
      .select('avatar')
      .from(TableName.user)
      .where('id', id)
      .queryRow()
    return r?.avatar
  }

  /**
   *
   */
  /**
   * 验证账号（account）在数据库是否已存在
   */
  static async accountIsUnique(account: string): Promise<boolean> {
    const r = await Mysql.db
      .select('count(1)')
      .from(TableName.user)
      .where('account', account)
      .queryValue()
    return r > 0
  }

  /**
   * 验证邮箱（email）在数据库是否已存在
   */
  static async emailIsUnique(email: string): Promise<boolean> {
    const r = await Mysql.db
      .select('count(1)')
      .from(TableName.user)
      .where('email', email)
      .queryValue()
    return r > 0
  }
}
