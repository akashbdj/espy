import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Person {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    allPerson: [Person!]!
  }
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
