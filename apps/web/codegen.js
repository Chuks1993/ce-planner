module.exports = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.graphql', 'src/**/*.gql'],
  hooks: {
    afterAllFileWrite: ['prettier --write']
  },
  generates: {
    'src/graphql/generated/index.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */'
          }
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query'
      ],
      config: {
        fetcher: {
          // endpoint: process.env.ENDPOINT,
          func: 'src/utils#gqlClient'
        }
      }
    }
  }
}
