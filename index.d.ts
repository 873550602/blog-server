import Koa from 'koa'
import { ResponseObj } from 'src/interface'

declare module "koa/index" {
    interface ExtendableContext extends BaseContext {
        session: { [key: string]: any }
    }
}

declare module 'sysConfig.js' {
    interface authentication {
        readonly whiteList?: string[]
    }
}