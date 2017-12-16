import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env
const SERVER_PORT = 3000
const END_POINT = '/graphql'

export default {
    JWT_SECRET,
    SERVER_PORT,
    END_POINT
}
