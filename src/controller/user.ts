import { generateInitResponse, saveFile } from "../lib/utils.js";
import UserDio from "../dioService/user.js";
import path from 'path'
import _ from 'lodash'
import ArticleDio from "../dioService/article.js";
export default class UserController {
    static async createUser(user: User): Promise<ResponseObj<null>> {
        if (await UserDio.accountIsUnique(user.account)) return generateInitResponse(-1, `账户${user.account}已存在`)
        if (user.email && await UserDio.emailIsUnique(user.email)) return generateInitResponse(-1, `邮箱${user.email}已存在`)
        const r = await UserDio.createUser(user)
        if (r) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }

    static async deleteUserById(id: string): Promise<ResponseObj<null>> {
        const r = await UserDio.deleteUserById(id)
        if (r) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }

    static async login(account: string, passport: string): Promise<ResponseObj<User | null>> {
        // 登录认证
        const r = await UserDio.login(account, passport)
        if (r) {
            return generateInitResponse(0, 'ok', {
                id: r.id,
                account: r.account,
                avatar: r.avatar,
                sex:r.sex,
                age:r.age,
                likes:r.likes
            })
        } else {
            return generateInitResponse(-1, '用户名或密码错误')
        }
    }

    static async changePasswordById(id: string, newPwd: string, odlPwd: string): Promise<ResponseObj<null>> {
        const user = await UserDio.getUserInfoById(id)
        if (!user) return generateInitResponse(-1, "用户不存在")
        if (user.password !== odlPwd) return generateInitResponse(-1, "密码不正确")
        const r = await UserDio.changePasswordById(id, newPwd)
        if (r) {
            return generateInitResponse(0, "密码设置成功，需要重新登录")
        } else {
            return generateInitResponse(-1, "error")
        }
    }

    static async getUserInfoById(id: string): Promise<ResponseObj<User | null>> {
        const r = await UserDio.getUserInfoById(id)
        if (r) {
            return generateInitResponse(0, "ok", r)
        } else {
            return generateInitResponse(-1, "error")
        }
    }

    static async saveAvatarById(id: string, avatar: StringObj, origin: string): Promise<ResponseObj<any>> {
        const p = saveFile(path.resolve(process.cwd(), "public/images/avatar"), avatar, id, true)
        if (typeof p === 'string') {
            const url = origin + '/' + path.join('images', 'avatar', p)
            const r = await UserDio.saveAvatarById(id, url)
            if (r) {
                return generateInitResponse(0, 'ok', { path: url })
            } else {
                return generateInitResponse(-1, 'error')
            }
        } else {
            return generateInitResponse(-1, "error")
        }
    }

    static async changeUserInfoById(id: string, info: { sex?: 0 | 1, age: number, labels: string[] }): Promise<ResponseObj<null>> {
        const r = await UserDio.changeUserInfoById(id, info)
        if (r) {
            return generateInitResponse(0, "ok")
        } else {
            return generateInitResponse(-1, "error")
        }
    }

    /**
     * 关注或取消关注
     * @param {id} 自己的id
     * @param {followId} 关注的人的id
     */
    static async followUserById(id: string, followId: string): Promise<ResponseObj<null>> {
        const follows = await UserDio.getFollowsById(id) || []
        const followeds = await UserDio.getFollowedsById(followId) || []
        if (follows.includes(followId)) {
            _.remove(follows, (v: string) => v === followId)
            _.remove(followeds, (v: string) => v === id)
        } else {
            follows.push(followId)
            followeds.push(id)
        }
        // 修改自己的信息，加入被关注者的id
        const r1 = await UserDio.changeUserInfoById(id, {
            follows
        })

        // 修改被关注人的信息，加入自己的id
        const r2 = await UserDio.changeUserInfoById(followId, {
            followeds
        })

        if (r1 && r2) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }

    /**
     * 点赞或取消点赞
     */
    /**
     * 关注或取消关注
     * @param {id} 自己的id
     * @param {articleId} 关注的人的id
     */
    static async likeArticleById(id: string, articleId: string): Promise<ResponseObj<null>> {
        const likes = await UserDio.getLikesById(id) || []
        let likeds = (await ArticleDio.getArticleInfoById(articleId, ['likeds']))?.likeds || 0
        if (likes.includes(articleId)) {
            _.remove(likes, (v: string) => v === articleId)
            likeds--
        } else {
            likes.push(articleId)
            likeds++
        }
        // 修改自己的信息，更新点赞文章ids
        const r1 = await UserDio.changeUserInfoById(id, {
            likes
        })

        // 修改文章信息，更新被点赞量
        const r2 = await ArticleDio.changeArticleById(articleId, {
            likeds
        })
        if (r1 && r2) {
            return generateInitResponse(0, 'ok')
        } else {
            return generateInitResponse(-1, 'error')
        }
    }
}