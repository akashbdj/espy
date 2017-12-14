import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'

const typeDefs = `
	type Person {
		id: ID!
		name: String!
        email: String!
        password: String!
	    location: Location!
	}

	type Location {
		longitude: Float!
		latitude: Float!
	}

	type Query {
        getPerson(email: String!): Person
		getPeopleNearPerson(id: ID!, distance: Int): [Person]!
		getPeopleNearLocation(longitude: Float!, latitude: Float!): [Person]! 
	}

	type Mutation {
        registerPerson(
            name: String!
            email: String!
            password: String!
        ): Person

		addPersonLocation(
            id: ID!
            latitude: Float!
            longitude: Float!
		): Person
	}
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
