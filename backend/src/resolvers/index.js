import bcrypt from 'bcrypt'

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
            if (!loc) {
                return new Error("Couldn't find user's location")
            }
            return { longitude: loc.coordinates[0], latitude: loc.coordinates[1] }
        }
    },

    Mutation: {
        async register (_, { name, email, password }, { DB }) {
            const existingUser = await DB.UserModel.findOne({ email })
            if (existingUser) {
                return new Error('Email address already exists')
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = await new DB.UserModel({
                name,
                email,
                password: hashPassword
            }).save()

            return user
        },

        async login (_, { email, password }, { DB }) {
            const user = await DB.UserModel.findOne({ email })
            if (!user) {
                return new Error('Email is not associated with any account')
            }

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return new Error('Credentials provided are wrong')
            }

            return user
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
