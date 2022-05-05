import TableName from '../lib/tableNames.js'
import { User } from '../interface/index.js'
import Mysql from '../lib/mysql/index.js'

// 创建用户
export const createUserDio = async (user: User): Promise<boolean> => {
  const _user: any = {
    ...user,
  }
  _user.labels = user.labels.join(',')
  const r = await Mysql.db.insert(TableName.user, _user).execute()
  return r.affectedRows === 1
}
// 删除用户
export const deleteUserByIdDio = async (id: string): Promise<boolean> => {
  const r = await Mysql.db.delete(TableName.user).where('id', id).execute()
  return r.affectedRows === 1
}
// 通过id获取用户
export const getUserByIdDio = async (id: string): Promise<User | undefined> => {
  return await Mysql.db.select("*").from(TableName.user).where('id', id).queryRow()
}
// 登录认证
export const loginDio = async (account: string, password: string): Promise<User | undefined> => {
  return await Mysql.db.select("*").from(TableName.user).where('account', account).where('password', password).queryRow()
}

// 通过id修改密码
export const changePasswordByIdDio = async (id: string, password: string): Promise<boolean> => {
  const r = await Mysql.db.update(TableName.user, { password }).where("id", id).execute()
  return r.affectedRows === 1
}

/**
 * 验证账号（account）在数据库是否已存在
 */
export const accountIsUnique = async (account: string): Promise<boolean> => {
  const r = await Mysql.db.select("count(1)").from(TableName.user).where('account', account).queryValue()
  return r > 0;
}

/**
 * 验证邮箱（email）在数据库是否已存在
 */
export const emailIsUnique = async (email: string): Promise<boolean> => {
  const r = await Mysql.db.select("count(1)").from(TableName.user).where('email', email).queryValue()
  return r > 0;
}
