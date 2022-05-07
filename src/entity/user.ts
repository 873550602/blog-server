import { isInvalid } from '../lib/utils.js'
import { User } from '../interface'

export default class UserEntity implements User {
  id: string
  account: string
  labels: string[]
  password: string
  avatar?: string
  realName?: string
  phoneNumbers?: string[]
  email?: string
  constructor(
    id: string,
    password:string,
    account: string,
    labels: string[],
    avatar?: string,
    realName?: string,
    phoneNumbers?: string[],
    email?: string
  ) {
    this.id = id
    this.account = account
    this.password = password
    this.realName = realName
    this.labels = labels
    this.avatar = avatar
    this.phoneNumbers = phoneNumbers
    this.email = email
  }

  static fromJson(obj: User): UserEntity {
    return new UserEntity(
      obj.id,
      obj.account,
      obj.password,
      obj.labels,
      obj.avatar,
      obj.realName,
      obj.phoneNumbers,
      obj.email
    )
  }

  static toJson(entity: UserEntity): User {
    return {
      id: entity.id,
      account: entity.account,
      password: entity.password,
      labels: entity.labels,
      avatar: entity.avatar,
      realName: entity.realName,
      phoneNumbers: entity.phoneNumbers,
      email: entity.email,
    }
  }

  static valid(user: User): string | boolean {
    if (isInvalid(user.account)) {
      return 'account是必传参数'
    } else if (typeof user.account !== 'string') {
      return 'account不是字符串类型'
    }
    return true
  }
}
