import bcrypt from 'bcrypt'

const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://127.0.0.1:27017/espy'

const connectToDB = async (url = URL) => await MongoClient.connect(url)

export default {
    Query: {
        async getPerson (_, { email }) {
            const db = await connectToDB()
            const people = db.collection('people')

            const person = await people.findOne({ email })
            console.log('PERSON IN DB : ', person)
            return person
        },

        async getPeopleNearLocation (_, { latitude, longitude, distance = 1000 * 50 }) {
            const db = await connectToDB()
            const loc = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const people = db.collection('people')

            const nearestPeople = await people
                .find({
                    loc: {
                        $nearSphere: {
                            $geometry: loc,
                            $maxDistance: distance
                        }
                    }
                })
                .toArray()

            return nearestPeople.map((person) => {
                const { id, loc: { coordinates: [longitude, latitude] } } = person
                return { id, longitude, latitude }
            })
        }
    },

    Mutation: {
        async addPersonLocation (_, { id, longitude, latitude }) {
            const db = await connectToDB()
            const people = db.collection('people')

            people.insert(
                {
                    id: id,
                    loc: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                },
                () => db.close()
            )

            return { id, longitude, latitude }
        },

        async registerPerson (_, { name, email, password }) {
            const db = await connectToDB()
            const people = db.collection('people')
            const hashPassword = await bcrypt.hash(password, 12)

            people.insert({ name, email, password: hashPassword }, () => db.close())
            return { name, email, password: hashPassword }
        }
    }
}
