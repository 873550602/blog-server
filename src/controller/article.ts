import UserDio from "../dioService/user.js"
import ArticleDio from "../dioService/article.js"
import { generateInitResponse } from "../lib/utils.js"
export default class ArticleController {
    static async createArticle(id: string, author: string, articleForm: CreateArticleForm): Promise<ResponseObj<null>> {
        const createTime = Date.now()
        const article: Article = {
            id,
            createTime,
            author,
            ...articleForm
        }
        const r = await ArticleDio.createArticle(article)
        if (r) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }

    static async getArticlePageByLabel(label: string, page: Page): Promise<ResponseObj<ArticlePageList>> {
        const r = await ArticleDio.getArticlePageByLabel(label, page);
        return generateInitResponse(0, 'ok', r)
    }

    static async getArticleInfoById(id: string): Promise<ResponseObj<Article | null>> {
        const article = await ArticleDio.getArticleInfoById(id)
        if (article) {
            // const user = await UserDio.getUserInfoById(article.author)
            // if (user) {
            //     article.author = user.account
            // } else {
            //     article.author = ""
            // }
            return generateInitResponse(0, "ok", article)
        } else {
            return generateInitResponse(-1, 'error')
        }
    }
}