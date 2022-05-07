import { generateInitResponse, saveFile } from "../lib/utils.js";
import { createUserDio, deleteUserByIdDio, accountIsUnique, emailIsUnique, loginDio, changePasswordByIdDio, getUserInfoByIdDio, changeUserInfoByIdDio, saveAvatarByIdDio, getAvatarById } from "../dioService/user.js";
import { ResponseObj, User } from "../interface";
import { StringObj } from "index.js";
import path from 'path'

export const createUserController = async (user: User): Promise<ResponseObj> => {
    if (await accountIsUnique(user.account)) return {
        code: -1,
        message: `账户${user.account}已存在`
    } as ResponseObj

    if (user.email && await emailIsUnique(user.email)) return {
        code: -1,
        message: `邮箱${user.email}已存在`
    } as ResponseObj

    const r = await createUserDio(user)
    if (r) {
        return {
            code: 0,
            message: 'ok'
        } as ResponseObj
    } else {
        return {
            code: -1,
            message: 'error'
        } as ResponseObj
    }
}

export const deleteUserByIdController = async (id: string): Promise<ResponseObj> => {
    const r = await deleteUserByIdDio(id)
    if (r) {
        return {
            code: 0,
            message: 'ok'
        } as ResponseObj
    } else {
        return {
            code: -1,
            message: 'error'
        } as ResponseObj
    }
}

export const loginController = async (account: string, passport: string): Promise<ResponseObj> => {
    // 登录认证
    const r = await loginDio(account, passport)
    if (r) {
        return generateInitResponse(0, 'ok', {
            id: r.id,
            account: r.account,
            avatar: r.avatar
        })
    } else {
        return generateInitResponse(-1, '用户名或密码错误')
    }
}

export const changePasswordByIdController = async (id: string, newPwd: string, odlPwd: string): Promise<ResponseObj> => {
    const user = await getUserInfoByIdDio(id)
    if (!user) return generateInitResponse(-1, "用户不存在")
    if (user.password !== odlPwd) return generateInitResponse(-1, "密码不正确")
    const r = await changePasswordByIdDio(id, newPwd)
    if (r) {
        return generateInitResponse(0, "密码设置成功，需要重新登录")
    } else {
        return generateInitResponse(-1, "error")
    }
}

export const getUserInfoByIdController = async (id: string): Promise<ResponseObj> => {
    const r = await getUserInfoByIdDio(id)
    if (r) {
        return generateInitResponse(0, "ok", r)
    } else {
        return generateInitResponse(-1, "error")
    }
}

export const saveAvatarByIdController = async (id: string, avatar: StringObj, origin: string): Promise<ResponseObj> => {
    const p = saveFile(path.resolve(process.cwd(), "public/images/avatar"), avatar, id, true)
    if (typeof p === 'string') {
        const url = origin + '/' + path.join('images', 'avatar', p)
        const r = await saveAvatarByIdDio(id, url)
        if (r) {
            return generateInitResponse(0, 'ok', { path: url })
        } else {
            return generateInitResponse(-1, 'error')
        }
    } else {
        return generateInitResponse(-1, "error")
    }
}

export const changeUserInfoByIdController = async (id: string, info: { sex?: 0 | 1, age: number, labels: string[] }): Promise<ResponseObj> => {
    const r = await changeUserInfoByIdDio(id, info)
    if (r) {
        return generateInitResponse(0, "ok")
    } else {
        return generateInitResponse(-1, "error")
    }
}