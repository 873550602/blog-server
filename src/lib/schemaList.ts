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
