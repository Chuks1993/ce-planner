import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'

const schema = loadFilesSync(path.join(__dirname, '.'), {
  ignoreIndex: true,
  extensions: ['gql', 'graphql']
})

export const typeDefs = mergeTypeDefs(schema)
