import { SchemaType } from './types'

export const userSchema: SchemaType = {
  title: 'user',
  type: 'object',
  properties: {
    account: {
      type: 'string',
      minLength: 6,
    },
    password: {
      type: 'string',
      // pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_*@%!])',
      minLength: 8,
    },
    labels: {
      type: 'array',
      uniqueItems: true,
      items: {
        pattern: '^(javascript|css|html|node|vue|react|angular)$',
      },
      minItems: 1,
      maxItems: 3,
    },
  },
  required: ['account', 'password', 'labels'],
}

export const userLoginSchema: SchemaType = {
  title: 'userLogin',
  type: 'object',
  properties: {
    account: {
      type: 'string',
      minLength: 6,
    },
    password: {
      type: 'string',
      // pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_*@%!])',
      minLength: 8,
    },
  },
}
export const changePasswordSchema: SchemaType = {
  title: 'changePassword',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    newPassword: {
      type: 'string',
      // pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_*@%!])',
      minLength: 8,
    },
    oldPassword: {
      type: 'string',
      // pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_*@%!])',
      minLength: 8,
    },
  },
  required: ['id', 'newPassword', 'oldPassword'],
}

export const changeUserInfoSchema: SchemaType = {
  title: 'changeUserInfo',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    sex: {
      type: 'number',
      pattern: '^[01]$',
    },
    age: {
      type: 'number',
      maximum: 120,
    },
    labels: {
      type: 'array',
      uniqueItems: true,
      items: {
        pattern: '^(javascript|css|html|node|vue|react|angular)$',
      },
      minItems: 1,
      maxItems: 3,
    },
  },
  required: ['id'],
}

export const createArticleSchema: SchemaType = {
  title: 'createArticle',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
    },
    content: {
      type: 'string',
      minLength: 1,
    },
    summary: {
      type: 'string',
      minLength: 1,
    },
    label: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['title', 'content', 'summary', 'label'],
}

export const getArticlesSchema: SchemaType = {
  title: 'getArticles',
  type: 'object',
  properties: {
    curr: {
      type: 'number',
      minimum: 1,
    },
    rows: {
      type: 'number',
      minimum: 1,
    },
    object: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['label'],
    },
  },
  required: ['curr', 'rows', 'object'],
}
export const getArticleByIdSchema: SchemaType = {
  title: 'getArticleById',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['id'],
}
export const getCommentByIdSchema: SchemaType = {
  title: 'getCommentById',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    hot: {
      type: 'object',
      properties: {
        is: {
          type: 'boolean',
        },
        threshold: {
          type: 'number',
        },
        limit: {
          type: 'number',
        },
      },
      required: ['is'],
    },
  },
  required: ['id'],
}
export const followUserSchema: SchemaType = {
  title: 'followUser',
  type: 'object',
  properties: {
    followedId: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['followedId'],
}
export const likeArticleSchema: SchemaType = {
  title: 'likeArticle',
  type: 'object',
  properties: {
    articleId: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['articleId'],
}
export const likeCommentSchema: SchemaType = {
  title: 'likeComment',
  type: 'object',
  properties: {
    commentId: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['commentId'],
}
export const incrementReadingByIdSchema: SchemaType = {
  title: 'incrementReadingById',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['id'],
}
export const collectArticleSchema: SchemaType = {
  title: 'collectArticle',
  type: 'object',
  properties: {
    articleId: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['articleId'],
}

export const createCommentSchema: SchemaType = {
  title: 'createComment',
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1,
    },
    commentator: {
      type: 'string',
      minLength: 1,
    },
    commented: {
      type: 'string',
      minLength: 1,
    },
    type: {
      type: 'number',
      pattern: '^[12]$',
    },
  },
  required: ['content', 'commentator', 'commented', 'type'],
}
export const deleteCommentSchema: SchemaType = {
  title: 'deleteComment',
  type: 'object',
  properties: {
    commentId: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['commentId'],
}
export const createDictionarySchema: SchemaType = {
  title: 'createDictionary',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    json: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['name', 'json'],
}
