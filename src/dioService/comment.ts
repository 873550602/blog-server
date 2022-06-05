import { deSerializeSqlData, enSerializeSqlData } from '../lib/utils.js'
import Mysql from '../lib/mysql/index.js'
import TableName from '../lib/tableNames.js'
import { Available } from '../lib/enum.js'

type TransObj = { trans?: any }
export default class CommentDio {
  /**
   * 创建评论
   * @param id  当前创建评论的id
   * @param comment 创建评论对象
   * @param trans 是否使用事务处理
   */
  static async createComment(
    id: string,
    comment: CreateCommentForm,
    { trans }: TransObj = {}
  ): Promise<boolean> {
    const db = trans || Mysql.db

    const comment_ = {
      id,
      ...comment,
      createTime: Date.now(),
    }
    const r = await db.insert(TableName.comment, comment_).execute()
    return r.affectedRows === 1
  }
  /**
   * 查询评论
   * @param id 评论id
   * @param fields 查询字段
   */
  static async getCommentById(
    id: string,
    fields: string[] | string = '*'
  ): Promise<Comment | undefined> {
    const r = await Mysql.db
      .select(fields)
      .from(TableName.comment)
      .where('id', id)
      .queryRow()

    return deSerializeSqlData(r, ['likedIds'])
  }
  /**
   * 根据被评论id获取子评论列表
   * @param pid 被评论id
   * @param fields 查询字段
   * @returns
   */
  static async getCommentsById(
    pid: string,
    fields: string[] | string = '*'
  ): Promise<Comment[]> {
    return await Mysql.db
      .select(fields)
      .from(TableName.comment)
      .where('commented', pid)
      .queryList()
  }
  /**
   * 通过id修改评论
   * @param id 评论id
   * @param info 修改字段
   * @param params.trans 是否使用事务
   */
  static async changeCommentById(
    id: string,
    info: ChangeCommentForm,
    { trans }: TransObj = {}
  ): Promise<boolean> {
    const db = trans || Mysql.db
    const info_ = enSerializeSqlData(info, ['likedIds'])
    const r = await db
      .update(TableName.comment, info_)
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }
  /**
   * 通过id删除评论
   * @param id 评论id
   * @param isSoft 是否软删除
   * @param param2.trans 是否事务处理
   */
  static async deleteCommentById(
    id: string,
    isSoft: boolean = true,
    { trans }: TransObj = {}
  ): Promise<boolean> {
    const db = trans || Mysql.db
    if (isSoft) {
      return await this.changeCommentById(id, {
        isAvailable: Available.invalid,
      })
    } else {
      const r = await db.delete(TableName.comment).where('id', id).execute()
      return r.affectedRows === 1
    }
  }
  /**
   * 软删除回退
   * @param id 评论id
   */
  static async backCommentById(id: string): Promise<boolean> {
    return await this.changeCommentById(id, {
      isAvailable: Available.valid,
    })
  }
}
