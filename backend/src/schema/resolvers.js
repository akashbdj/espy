const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://127.0.0.1:27017/espy'

const connectToDB = async (url = URL) => await MongoClient.connect(url)

export default {
    Query: {
        async getPeopleNearPerson (_, { id, distance = 1000 * 50 }) {
            const db = await connectToDB()

            const people = db.collection('people')
            const person = await people.findOne({ id })

            const nearestPeople = await people
                .find({
                    loc: {
                        $nearSphere: {
                            $geometry: person.loc,
                            $maxDistance: distance
                        }
                    }
                })
                .toArray()

            return nearestPeople.map((person) => {
                const { id, loc: { coordinates: [long, lat] } } = person
                return { id, long, lat }
            })
        }
    },

    Mutation: {
        async addPersonLocation (_, { id, long, lat }) {
            const db = await connectToDB()
            const people = db.collection('people')

            people.insert(
                {
                    id: id,
                    loc: {
                        type: 'Point',
                        coordinates: [long, lat]
                    }
                },
                () => db.close()
            )

            return { id, long, lat }
        }
    }
}
