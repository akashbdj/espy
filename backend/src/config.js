import dotenv from 'dotenv'

dotenv.config()

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env
const SERVER_PORT = 3000
const END_POINT = '/graphql'

export default {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    SERVER_PORT,
    END_POINT
}
