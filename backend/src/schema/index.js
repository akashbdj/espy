import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'

const typeDefs = `
	type User {
		id: ID!
		name: String!
        email: String!
		location: Location!
	}

	type Location {
		longitude: Float!
		latitude: Float!
	}

	type RegisterResponse {
		id: ID!
		accessToken: String!
		refreshToken: String!
	}

	type LoginResponse {
		id: ID!
		accessToken: String!
		refreshToken: String!
	}

	type Query {
        getUser(email: String!): User
		
		getPeopleNearLocation(
			longitude: Float!,
			latitude: Float!
		): [User]
	}

	type Mutation {
        register(
            name: String!,
            email: String!,
            password: String!
		): RegisterResponse
		
		login(
			email: String!,
			password: String!
		): User

		updateUserLocation(
            email: String!,
            latitude: Float!,
            longitude: Float!
		): User!
	}
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
