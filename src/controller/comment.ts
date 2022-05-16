import CommentDio from "../dioService/comment.js";
import { generateInitResponse } from "../lib/utils.js";

export default class CommentController {
    static async createComment(id: string, comment: CreateCommentForm): Promise<ResponseObj<null>> {
        const r = await CommentDio.createComment(id, comment)
        if (r) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }
}