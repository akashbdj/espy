import _ from 'lodash'
import jwt from 'jsonwebtoken'

export const createTokens = (user, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET) => {
    const userDetails = _.pick(user, ['email', 'id'])
    return {
        accessToken: jwt.sign({ user }, JWT_ACCESS_SECRET, { expiresIn: '1h' }),
        refreshToken: jwt.sign({ user }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    }
}
