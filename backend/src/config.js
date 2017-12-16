import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env

export default {
    JWT_SECRET
}
