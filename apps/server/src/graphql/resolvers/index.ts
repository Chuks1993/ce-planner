import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import path from 'path'

const allResolvers = loadFilesSync(path.join(__dirname, '.'), {
  ignoreIndex: true
})

export const resolvers = mergeResolvers(allResolvers)
