export interface User {
  id: string
  password: string
  account: string
  labels: string[]
  avatar?: string
  realName?: string
  phoneNumbers?: string[]
  email?: string
}
export interface ResponseObj {
  code?:number,
  message?:string,
  data:any
}