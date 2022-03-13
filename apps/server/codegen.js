// IMPORTANT renamed graphql to gql
module.exports = {
  overwrite: true,
  schema: ['src/graphql/schema/*.gql', 'src/graphql/schema/*.graphql'],
  document: null,
  generates: {
    'src/graphql/generated/index.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */'
          }
        },
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        contextType: 'src/types#MyContext',
        useIndexSignature: true
      }
    }
  }
}
