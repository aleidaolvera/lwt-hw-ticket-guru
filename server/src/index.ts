import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'
import path from 'path'
import resolvers from './resolvers'
import dataSources from './datasources'

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const typeDefs = gql(schema)

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`)
})
