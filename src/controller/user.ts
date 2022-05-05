import { createUserDio, deleteUserByIdDio, accountIsUnique, emailIsUnique, loginDio, changePasswordByIdDio, getUserByIdDio } from "../dioService/user.js";
import { ResponseObj, User } from "../interface";

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
        return {
            code: 0,
            message: 'ok',
            data: {
                id: r.id,
                account: r.account,
            }
        } as ResponseObj
    } else {
        return {
            code: -1,
            message: '用户名或密码错误'
        } as ResponseObj
    }
}

export const changePasswordByIdController = async (id: string, newPwd: string, odlPwd: string): Promise<ResponseObj> => {
    const user = await getUserByIdDio(id)
    if (!user) return { code: -1, message: "用户不存在" } as ResponseObj
    if (user.password !== odlPwd) return { code: -1, message: "密码不正确" } as ResponseObj
    const r = await changePasswordByIdDio(id, newPwd)
    if (r) {
        return { code: 0, message: "密码设置成功，需要重新登录" } as ResponseObj
    } else {
        return { code: -1, message: "error" } as ResponseObj
    }
}