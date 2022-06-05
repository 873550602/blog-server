import { deSerializeSqlData, enSerializeSqlData } from '../lib/utils.js'
import Mysql from '../lib/mysql/index.js'
import TableName from '../lib/tableNames.js'
import UserDio from './user.js'
import { Available } from '../lib/enum.js'
import CommentDio from './comment.js'
type TransObj = { trans?: any }
export default class ArticleDio {
  /**
   * 创建文章
   */
  static async createArticle(article: Article): Promise<boolean> {
    const r = await Mysql.db.insert(TableName.article, article).execute()
    return r.affectedRows === 1
  }
  /**
   * 获取分页文章列表
   */
  static async getArticlePageByLabel(
    label: string,
    page: Page
  ): Promise<ArticlePageList> {
    const total = await ArticleDio.getArticleTotalNumberByLabel(label)
    const r = await Mysql.db
      .select('*')
      .from(TableName.article)
      .where('label', label)
      .queryListWithPaging(page.curr, page.rows)
    return { total, list: r.rows }
  }
  /**
   * 通过id获取文章信息
   */
  static async getArticleInfoById(
    id: string,
    fields: string[] | string = '*'
  ): Promise<Article | undefined> {
    if (Array.isArray(fields)) fields = fields.join(',')
    const r = await Mysql.db
      .select(fields)
      .from(TableName.article)
      .where('id', id)
      .queryRow()
    return deSerializeSqlData(r, ['collectionIds', 'commentIds', 'likedIds'])
  }

  /**
   * 通过id更新文章信息
   */
  static async changeArticleById(
    id: string,
    info: ChangeArticleForm,
    { trans }: TransObj = {}
  ): Promise<boolean> {
    const db = trans || Mysql.db
    const info_ = enSerializeSqlData(info, [
      'collectionIds',
      'commentIds',
      'likedIds',
    ])
    const r = await db
      .update(TableName.article, info_)
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }

  /**
   * 根据id获取文章评论
   * @param id 文章id
   * @param init 第一次调用
   * @param param.hot 是否查询热评
   * @param param.threshold 热评法制，点赞数量
   * @param param.limit 热评数量
   */
  static async getCommentsById(
    id: string,
    init = true,
    { hot = false, threshold = 30, limit = 5 } = { hot: false }
  ): Promise<Array<Comment>> {
    let r = await Mysql.db
      .select('*')
      .from(TableName.comment)
      .where('commented', id)
      .orderby('createTime desc')
      .queryList()
    r = r.map((e: Comment) => deSerializeSqlData(e, ['likedIds']))
    let list = <any>[]
    if (r.length > 0) {
      for (const e of r) {
        e.commentator = await UserDio.getUserInfoById(e.commentator, [
          'id',
          'account',
          'avatar',
        ])
        if (e.deep > 1) {
          e.children = []
          const arr = await ArticleDio.getCommentsById(e.id, false)
          list = list.concat(arr)
        } else {
          e.children = await ArticleDio.getCommentsById(e.id, false)
        }
        // 如果评论有效则插入数组
        if (e.isAvailable) {
          if (hot) {
            e.likeds >= threshold && list.push(e)
            if (list.length === limit) return list
          } else {
            list.push(e)
          }
        }
      }
      if (init) {
        if (hot) {
          return list.sort((a: Comment, b: Comment) => b.likeds! - a.likeds!)
        } else {
          return list.sort(
            (a: Comment, b: Comment) => b.createTime - a.createTime
          )
        }
      } else {
        return list.sort(
          (a: Comment, b: Comment) => a.createTime - b.createTime
        )
      }
    } else {
      return r
    }
  }

  // 获取文章总数
  private static async getArticleTotalNumberByLabel(
    label: string
  ): Promise<number> {
    return await Mysql.db
      .select('count(*)')
      .from(TableName.article)
      .where('label', label)
      .queryValue()
  }
}
