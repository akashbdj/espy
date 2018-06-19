import bcrypt from 'bcrypt'
import { createTokens } from '../auth'

export default {
    Query: {
        async getUser (_, { email }, { DB }) {
            const user = await DB.UserModel.findOne({ email })

            if (!user) {
                return new Error('Email is not associated with any account')
            }

            return user
        },

        async getPeopleNearLocation (_, args, { DB }) {
            let { latitude, longitude, distance = 1000 * 50 } = args
            const loc = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            return await DB.UserModel.find({
                loc: {
                    $nearSphere: {
                        $geometry: loc,
                        $maxDistance: distance
                    }
                }
            })
        }
    },

    User: {
        location ({ loc }) {
            // TODO: do something about this!
            if (!loc) {
                return new Error("Couldn't find user's location")
            }
            return { longitude: loc.coordinates[0], latitude: loc.coordinates[1] }
        }
    },

    Mutation: {
        async register (
            _,
            { name, email, password },
            { DB, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }
        ) {
            const existingUser = await DB.UserModel.findOne({ email })
            if (existingUser) {
                return {
                    success: false,
                    error: 'Email address already exists'
                }
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = await new DB.UserModel({
                name,
                email,
                password: hashPassword
            }).save()

            const { accessToken, refreshToken } = createTokens(
                user,
                JWT_ACCESS_SECRET,
                `${JWT_REFRESH_SECRET}-${password}`
            )

            return {
                success: true,
                user,
                accessToken,
                refreshToken
            }
        },

        async login (_, { email, password }, { DB, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }) {
            const user = await DB.UserModel.findOne({ email })
            if (!user) {
                return {
                    success: false,
                    error: 'Email is not associated with any account'
                }
            }

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return {
                    success: false,
                    error: 'Credentials provided are wrong'
                }
            }

            const { accessToken, refreshToken } = createTokens(
                user,
                JWT_ACCESS_SECRET,
                `${JWT_REFRESH_SECRET}-${password}`
            )

            return {
                success: true,
                user,
                accessToken,
                refreshToken
            }
        },

        async updateUserLocation (_, { email, longitude, latitude }, { DB }) {
            const user = await DB.UserModel.findOneAndUpdate(
                { email },
                {
                    loc: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                },
                { upsert: true }
            )

            return user
        }
    }
}
