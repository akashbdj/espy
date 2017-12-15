import bcrypt from 'bcrypt'

export default {
    Query: {
        async getUser (_, { email }, { DB }) {
            return await DB.UserModel.findOne({ email })
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
            if (!loc) return {}
            return { longitude: loc.coordinates[0], latitude: loc.coordinates[1] }
        }
    },

    Mutation: {
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
        },

        async registerUser (_, { name, email, password }, { DB }) {
            const hashPassword = await bcrypt.hash(password, 12)
            const user = await new DB.UserModel({
                name,
                email,
                password: hashPassword
            }).save()

            return { name, email, password }
        }
    }
}
