import { schemaType } from './types'

export const userSchema: schemaType = {
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

export const userLoginSchema: schemaType = {
  title: "userLogin",
  type: "object",
  properties: {
    account: {
      type: 'string',
      minLength: 6,
    },
    password: {
      type: 'string',
      // pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[#$_*@%!])',
      minLength: 8,
    }
  }
}
export const changePasswordSchema: schemaType = {
  title: "changePassword",
  type: "object",
  properties: {
    id: {
      type: 'string',
      minLength: 1
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
    }
  },
  required: ["id", "newPassword", "oldPassword"]
}

export const changeUserInfoSchema: schemaType = {
  title: "changeUserInfo",
  type: "object",
  properties: {
    id: {
      type: 'string',
      minLength: 1
    },
    sex: {
      type: 'number',
      pattern: '0|1'
    },
    age: {
      type: 'number',
      maximum: 120
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
  required: ["id"]
}

export const createArticleSchema: schemaType = {
  title: "createArticle",
  type: "object",
  properties: {
    title: {
      type: 'string',
      minLength: 1,
    },
    content: {
      type: 'string',
      minLength: 1
    },
    summary: {
      type: 'string',
      minLength: 1
    },
    label: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['title', 'content', 'summary', 'label']
}

export const getArticlesSchema: schemaType = {
  title: "getArticles",
  type: "object",
  properties: {
    curr: {
      type: 'number',
      minimum: 1
    },
    rows: {
      type: 'number',
      minimum: 1
    },
    object: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          minLength: 1
        }
      },
      required: ['label']
    }
  },
  required: ['curr', 'rows', 'object']
}
export const getArticleByIdSchema: schemaType = {
  title: "getArticleById",
  type: "object",
  properties: {
    id: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['id',]
}
export const followUserSchema: schemaType = {
  title: "followUser",
  type: "object",
  properties: {
    followedId: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['followedId',]
}
export const likeArticleSchema: schemaType = {
  title: "likeArticle",
  type: "object",
  properties: {
    articleId: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['articleId',]
}
export const incrementReadingByIdSchema: schemaType = {
  title: "incrementReadingById",
  type: "object",
  properties: {
    id: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['id',]
}
export const collectArticleSchema: schemaType = {
  title: "collectArticle",
  type: "object",
  properties: {
    articleId: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['articleId']
}

export const createCommentSchema: schemaType = {
  title: "createComment",
  type: "object",
  properties: {
    content: {
      type: 'string',
      minLength: 1
    },
    commentator: {
      type: 'string',
      minLength: 1
    },
    commented: {
      type: 'string',
      minLength: 1
    },
  },
  required: ['content', 'commentator', 'commented']
}
