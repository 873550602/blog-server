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
export const getUserInfoByIdDio = async (id: string): Promise<User | undefined> => {
  const r = await Mysql.db.select("*").from(TableName.user).where('id', id).queryRow()
  r.labels = r?.labels.split(',')
  return r
}
// 登录认证
export const loginDio = async (account: string, password: string): Promise<User | undefined> => {
  return await Mysql.db.select("*").from(TableName.user).where('account', account).where('password', password).queryRow()
}

// 通过id修改密码
export const changePasswordByIdDio = async (id: string, password: string): Promise<boolean> => {
  const r = await Mysql.db.update(TableName.user, { password }).where('id', id).execute()
  return r.affectedRows === 1
}

// 通过id修改普通信息
export const changeUserInfoByIdDio = async (id: string, info: { sex?: 0 | 1, age: number, labels: string[]|string }): Promise<boolean> => {
  info.labels = (info.labels as []).join(',')
  const r = await Mysql.db.update(TableName.user, info).where('id', id).execute()
  return r.affectedRows === 1
}

// 通过id存储头像地址
export const saveAvatarByIdDio = async (id: string, avatar: string): Promise<boolean> => {
  const r = await Mysql.db.update(TableName.user, { avatar }).where('id', id).execute()
  return r.affectedRows === 1
}
/**
 * 通过id获取头像路径
 */
export const getAvatarById = async (id: string): Promise<string | undefined> => {
  const r = await Mysql.db.select('avatar').from(TableName.user).where('id', id).queryRow()
  return r?.avatar
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
