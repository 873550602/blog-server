declare type StringObj = {
  [key: stirng]: any
}
declare interface Page {
  curr: number
  rows: number
}
declare interface PageResponse<T> {
  total: number
  list: T[]
}

declare interface ResponseObj<T> {
  code?: number
  message?: string
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
  summary?: string
  label?: string
  reading?: number
  collectionVolume?: number
  collectionIds?: string[]
  commentVolume?: number
  commentIds?: string[]
  likeds?: number
  likedIds?: string[]
}
declare interface Article extends CreateArticleForm {
  id: string
  createTime: number
  author: string
  reading?: number
  collectionVolume?: number
  collectionIds?: string[]
  commentVolume?: number
  commentIds?: string[]
  likeds?: number
  likedIds?: string[]
}
declare interface ArticlePageList extends PageResponse<Article> {}

declare interface ChangeUserForm {
  sex?: 0 | 1
  age?: number
  labels?: string[]
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
  collects?: string[]
  follows?: string[]
  followeds?: string[]
}

declare interface CreateCommentForm {
  content: string
  commentator: string
  commented: string
  deep?: number
  type: 1 | 2
}
declare interface ChangeCommentForm {
  likeds?: number
  likedIds?: string[]
  content?: string
  isAvailable?: 0 | 1
  type?: 1 | 2
}
declare interface Comment extends CreateCommentForm {
  id: string
  createTime: number
  likeds?: number
  likedIds?: string[]
  deep: number
  isAvailable?: 0 | 1
}

declare interface DictionaryForm {
  name: string
  json: string
}

declare interface Dictionary extends DictionaryForm {
  id: int
}

declare interface changeDictionaryForm {
  id: int
  name?: string
  json?: string
}
