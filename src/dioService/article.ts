import { deSerializeSqlData, enSerializeSqlData } from '../lib/utils.js'
import Mysql from '../lib/mysql/index.js'
import TableName from '../lib/tableNames.js'
import UserDio from './user.js'
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
    return deSerializeSqlData(r, ['collectionIds', 'commentIds'])
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
    const info_ = enSerializeSqlData(info, ['collectionIds', 'commentIds'])
    const r = await db
      .update(TableName.article, info_)
      .where('id', id)
      .execute()
    return r.affectedRows === 1
  }

  // 根据id获取文章评论
  static async getCommentsById(id: string): Promise<Array<any>> {
    let r = await Mysql.db
      .select('*')
      .from(TableName.comment)
      .where('commented', id)
      .orderby('createTime desc')
      .queryList()
    if (r.length > 0) {
      const list = <any>[]
      for (const e of r) {
        e.commentator = await UserDio.getUserInfoById(e.commentator, [
          'id',
          'account',
          'avatar',
        ])
        e.children = await ArticleDio.getCommentsById(e.id)
        list.push(e)
      }
      return list
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
