import _ from 'lodash'
import jwt from 'jsonwebtoken'

const EMPTY_OBJECT = {}

export const createTokens = (user, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET) => {
    const userDetails = _.pick(user, ['email', 'id'])

    return {
        accessToken: jwt.sign({ userDetails }, JWT_ACCESS_SECRET, { expiresIn: '1h' }),
        refreshToken: jwt.sign({ userDetails }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    }
}

export const refreshTokens = async (
    accessToken,
    refreshToken,
    DB,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
) => {
    let userId = 0

    try {
        const { userDetails: { id } } = jwt.decode(refreshToken)
        userId = id
    } catch (err) {
        return EMPTY_OBJECT
    }

    if (!userId) {
        return EMPTY_OBJECT
    }

    const user = await DB.UserModel.findOne({ id: userId })

    if (!user) {
        return EMPTY_OBJECT
    }

    const REFRESH_SECRET = `${JWT_REFRESH_SECRET}-${user.password}`

    try {
        jwt.verify(refreshToken, REFRESH_SECRET)
    } catch (err) {
        return EMPTY_OBJECT
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await createTokens(
        user,
        JWT_ACCESS_SECRET,
        REFRESH_SECRET
    )

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user
    }
}
