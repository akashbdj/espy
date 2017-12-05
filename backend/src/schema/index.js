import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type Person {
    id: ID!
    longitude: Float!
    latitude: Float!
  }

  type Query {
    getPeopleNearPerson(id: ID!, distance: Int): [Person]!
    getPeopleNearLocation(longitude: Float!, latitude: Float!): [Person]! 
  }

  type Mutation {
    addPersonLocation (
      id: ID!
      longitude: Float!
      latitude: Float!
    ): Person
  }
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
