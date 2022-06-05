import Mysql from '../lib/mysql/index.js'
import CommentDio from '../dioService/comment.js'
import { generateInitResponse } from '../lib/utils.js'

export default class CommentController {
  static async createComment(
    id: string,
    comment: CreateCommentForm
  ): Promise<ResponseObj<null>> {
    // 获取深度并加1
    const deep =
      (await CommentDio.getCommentById(comment.commented, ['deep']))?.deep || 0
    comment.deep = deep + 1
    const r = await CommentDio.createComment(id, comment)
    if (r) {
      return generateInitResponse(0, 'ok')
    } else {
      return generateInitResponse(-1, 'error')
    }
  }
  static async deleteCommentById(
    id: string,
    commentId: string,
    isSoft: boolean = true
  ): Promise<ResponseObj<null>> {
    if (!(await this.belongUser(id, commentId)))
      return generateInitResponse(-1, 'error')
    // 获取评论深度
    const deep =
      (await CommentDio.getCommentById(commentId, ['deep']))?.deep || 0
    if (isSoft || deep > 1) {
      // 只删除当前评论
      const r = await CommentDio.deleteCommentById(commentId, isSoft)
      if (r) {
        return generateInitResponse(0, 'ok')
      } else {
        return generateInitResponse(-1, 'error')
      }
    } else {
      // 删除当前评论和子评论
      const trans = await Mysql.db.useTransaction()
      try {
        const r = await this.deepDeleteCommentById([commentId], isSoft, trans)
        await trans.commit()
        if (r) {
          return generateInitResponse(0, 'ok')
        } else {
          await trans.rollback()
          return generateInitResponse(-1, 'error')
        }
      } catch (error) {
        await trans.rollback()
        return generateInitResponse(-1, 'error')
      }
    }
  }

  /**
   * 通过id递归删除评论和子评论
   * @param ids 评论ids
   * @param isSoft 是否软删除
   * @param trans 是否事务处理
   */
  static async deepDeleteCommentById(
    ids: string[],
    isSoft: boolean = true,
    trans: any
  ): Promise<boolean> {
    for (const id of ids) {
      const ids = await this.getChildrenIds(id)
      if (ids.length > 0) {
        await this.deepDeleteCommentById(ids, isSoft, trans)
      }
      const r = await CommentDio.deleteCommentById(id, isSoft, { trans })
      if (!r) return false
    }
    return true
  }
  /**
   * 根据评论id回复软删除的评论
   * @param id 用户id
   * @param commentId 评论id
   */
  static async backCommentById(
    id: string,
    commentId: string
  ): Promise<ResponseObj<null>> {
    if (!(await this.belongUser(id, commentId)))
      return generateInitResponse(-1, 'error')
    const r = await CommentDio.backCommentById(commentId)
    if (r) {
      return generateInitResponse(0, 'ok')
    } else {
      return generateInitResponse(-1, 'error')
    }
  }
  // 获取子评论ids
  private static async getChildrenIds(commentId: string): Promise<string[]> {
    const r = await CommentDio.getCommentsById(commentId, ['id'])
    return r.map((e: Comment) => e.id)
  }
  // 判断评论是否属于用户
  private static async belongUser(
    userId: string,
    commentId: string
  ): Promise<boolean> {
    const commentator = (
      await CommentDio.getCommentById(commentId, ['commentator'])
    )?.commentator
    return commentator === userId
  }
}
