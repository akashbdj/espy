const MongoClient = require('mongodb').MongoClient
const URL = 'mongodb://127.0.0.1:27017/espy'

const connectToDB = async (url = URL) => await MongoClient.connect(url)
const getPersonCoordinates = (person) => person.loc.coordinates

export default {
    Query: {
        async getPeopleNearPerson (_, { id, distance = 1000 * 50 }) {
            const db = await connectToDB()

            const people = db.collection('people')
            const person = await people.findOne({ id })

            return people
                .find({
                    loc: {
                        $nearSphere: {
                            $geometry: person.loc,
                            $maxDistance: distance
                        }
                    }
                })
                .toArray()
        }
    },

    Person: {
        lat: (person) => getPersonCoordinates(person)[1],
        long: (person) => getPersonCoordinates(person)[0]
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
                        coordinates: [long, lat]
                    }
                },
                () => db.close()
            )

            return { id, lat, long }
        }
    }
}
