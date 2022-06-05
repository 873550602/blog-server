import UserDio from '../dioService/user.js'
import ArticleDio from '../dioService/article.js'
import { generateInitResponse } from '../lib/utils.js'
export default class ArticleController {
  static async createArticle(
    id: string,
    author: string,
    articleForm: CreateArticleForm
  ): Promise<ResponseObj<null>> {
    const createTime = Date.now()
    const article: Article = {
      id,
      createTime,
      author,
      ...articleForm,
    }
    const r = await ArticleDio.createArticle(article)
    if (r) {
      return generateInitResponse(0, 'ok')
    } else {
      return generateInitResponse(-1, 'error')
    }
  }

  static async getArticlePageByLabel(
    label: string,
    page: Page
  ): Promise<ResponseObj<ArticlePageList>> {
    const r = await ArticleDio.getArticlePageByLabel(label, page)
    return generateInitResponse(0, 'ok', r)
  }

  static async getArticleInfoById(
    id: string
  ): Promise<ResponseObj<Article | null>> {
    const article = await ArticleDio.getArticleInfoById(id)
    if (article) {
      // const user = await UserDio.getUserInfoById(article.author)
      // if (user) {
      //     article.author = user.account
      // } else {
      //     article.author = ""
      // }
      return generateInitResponse(0, 'ok', article)
    } else {
      return generateInitResponse(-1, 'error')
    }
  }
  /**
   * 根据文章id获取所有评论
   * @param id 文章id
   */
  static async getCommentsById(id: string): Promise<ResponseObj<Comment[]>> {
    const r = await ArticleDio.getCommentsById(id)
    if (r) {
      return generateInitResponse(0, 'ok', r)
    } else {
      return generateInitResponse(-1, 'error')
    }
  }

  static async getHotCommentsById(
    id: string,
    { hot, threshold, limit }
  ): Promise<ResponseObj<Comment[]>> {
    const r = await ArticleDio.getCommentsById(id, true, {
      hot,
      threshold,
      limit,
    })
    return generateInitResponse(0, 'ok', r)
  }

  static async changeArticleReadingById(
    id: string
  ): Promise<ResponseObj<null>> {
    let reading =
      (await ArticleDio.getArticleInfoById(id, ['reading']))?.reading || 0
    const r = await ArticleDio.changeArticleById(id, { reading: ++reading })
    if (r) {
      return generateInitResponse(0, 'ok')
    } else {
      return generateInitResponse(-1, 'error')
    }
  }
}
