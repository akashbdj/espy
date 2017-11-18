const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://127.0.0.1:27017/espy'

const connectToDB = async (url = URL) => await MongoClient.connect(url)

export default {
    Query: {
        allPeople: () => [],

        async getPeopleNearPerson (_, { id, distance = 1000 * 5 }) {
            const db = await connectToDB()

            const people = db.collection('people')
            const person = await people.findOne({ id })

            return people
                .find({
                    loc: {
                        $near: {
                            $geometry: person.loc,
                            $maxDistance: distance
                        }
                    }
                })
                .toArray()
        }
    },

    Mutation: {
        async addPersonLocation (_, { id, lat, long }) {
            const db = await connectToDB()
            const people = db.collection('people')

            people.insert(
                {
                    id: id,
                    loc: {
                        type: 'Point',
                        coordinates: [lat, long]
                    }
                },
                () => db.close()
            )

            return { id, lat, long }
        }
    }
}
