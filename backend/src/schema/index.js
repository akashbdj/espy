import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'

const typeDefs = `
	type User {
		id: ID!
		name: String
        email: String
		location: Location
	}

	type Location {
		longitude: Float!
		latitude: Float!
	}

	type RegisterResponse {
		user: User
		accessToken: String
		refreshToken: String
		success: Boolean!
		error: String
	}

	type LoginResponse {
		user: User
		accessToken: String
		refreshToken: String
		success: Boolean!
		error: String
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
		): RegisterResponse!
		
		login(
			email: String!,
			password: String!
		): LoginResponse!

		updateUserLocation(
            email: String!,
            latitude: Float!,
            longitude: Float!
		): User!
	}
`

const Schema = makeExecutableSchema({ typeDefs, resolvers })

export default Schema
