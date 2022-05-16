import { deSerializeSqlData, enSerializeSqlData } from "../lib/utils.js";
import Mysql from "../lib/mysql/index.js"
import TableName from "../lib/tableNames.js"
export default class ArticleDio {
    /**
     * 创建文章
     */
    static async createArticle(article: Article): Promise<boolean> {
        const r = await Mysql.db.insert(TableName.article, article).execute();
        return r.affectedRows === 1
    }
    /**
     * 获取分页文章列表
     */
    static async getArticlePageByLabel(label: string, page: Page): Promise<ArticlePageList> {
        const total = await ArticleDio.getArticleTotalNumberByLabel(label);
        const r = await Mysql.db.select("*").from(TableName.article).where('label', label).queryListWithPaging(page.curr, page.rows)
        return { total, list: r.rows }
    }
    /**
     * 通过id获取文章信息
     */
    static async getArticleInfoById(id: string, fields: string[] | string = '*'): Promise<Article | undefined> {
        if (Array.isArray(fields)) fields = fields.join(',')
        const r = Mysql.db.select(fields).from(TableName.article).where('id', id).queryRow()
        return deSerializeSqlData(r, ['collectionVolumeIds', 'commentVolumeIds'])
    }

    /**
     * 通过id更新文章信息
     */
    static async changeArticleById(id: string, info: ChangeArticleForm): Promise<boolean> {
        const info_ = enSerializeSqlData(info, ['collectionVolumeIds', 'commentVolumeIds'])
        const r = await Mysql.db.update(TableName.article, info_).where('id', id).execute()
        return r.affectedRows === 1
    }

    // 获取文章总数
    private static async getArticleTotalNumberByLabel(label: string): Promise<number> {
        return await Mysql.db.select('count(*)').from(TableName.article).where('label', label).queryValue()
    }
}
