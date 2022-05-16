import Mysql from "../lib/mysql/index.js"
import TableName from "../lib/tableNames.js";

type TransObj = { trans?: any }
export default class CommentDio {
    static async createComment(id: string, comment: CreateCommentForm, { trans }: TransObj = {}): Promise<boolean> {
        const db = trans || Mysql.db;

        const comment_ = {
            id,
            ...comment,
            createTime: Date.now()
        }
        const r = await db.insert(TableName.comment, comment_).execute()
        return r.affectedRows === 1
    }
}