import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Person {
    id: ID!
    lat: Float!
    long: Float!
  }

  type Query {
    allPeople: [Person]!,
    getPeopleNearPerson(id: String!, distance: Int): [Person]!
  }

  type Mutation {
    addPersonLocation (
      id: ID!
      lat: Float!
      long: Float!
    ): Person
  }
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
