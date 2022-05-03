import { createUserDio, deleteUserByIdDio, accountIsUnique, emailIsUnique } from "../dioService/user.js";
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