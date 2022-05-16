declare type StringObj = {
    [key: stirng]: any
}
declare interface Page {
    curr: number,
    rows: number
}
declare interface PageResponse<T> {
    total: number,
    list: T[]
}

declare interface ResponseObj<T> {
    code?: number,
    message?: string,
    data: T
}

declare interface CreateArticleForm {
    title: string
    content: string
    summary: string
    label: string
}

declare interface ChangeArticleForm {
    title?: string
    content?: string
    summary?: string,
    label?: string,
    reading?: number,
    collectionVolume?: number,
    collectionVolumeIds?: string[],
    commentVolume?: number,
    commentVolumeIds?: string[],
    likeds?: number
}
declare interface Article extends CreateArticleForm {
    id: string
    createTime: number
    author: string
    reading?: number,
    collectionVolume?: number,
    collectionVolumeIds?: string[],
    commentVolume?: number,
    commentVolumeIds?: string[],
    likeds?: number
}
declare interface ArticlePageList extends PageResponse<Article> { }

declare interface ChangeUserForm {
    sex?: 0 | 1
    age?: number
    labels?: string[]
    likes?: string[]
    collects?: string[]
    follows?: string[]
    followeds?: string[]
}

declare interface User {
    id: string
    password: string
    account: string
    labels: string[]
    avatar?: string
    realName?: string
    phoneNumber?: string
    email?: string
    createTime?: number
    sex?: 0 | 1
    age?: number
    likes?: string[]
    collects?: string[]
    follows?: string[]
    followeds?: string[]
}
