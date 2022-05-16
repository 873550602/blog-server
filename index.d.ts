import Koa from 'koa'
import { ResponseObj } from 'src/interface'

declare module "koa/index" {
    interface ExtendableContext extends BaseContext {
        session: { [key: string]: any }
    }
    interface Request {
        files: File[]
    }
}

declare module 'sysConfig.js' {
    interface authentication {
        readonly whiteList?: string[]
    }
}