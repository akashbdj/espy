import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './schema'
import DB from './models/db'
import { refreshTokens } from './auth'
import config from './config'
import _ from 'lodash'

const { SERVER_PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, END_POINT } = config

let app = express()

const checkTokens = async (req, res, next) => {
    let accessToken = req.headers['authorization']

    if (accessToken) {
        try {
            accessToken = accessToken.replace('Bearer ', '')
            const { userDetails } = jwt.verify(accessToken, JWT_ACCESS_SECRET)
            req.user = userDetails
        } catch (err) {
            const refreshToken = req.headers['x-refresh-token']
            const newTokens = await refreshTokens(
                accessToken,
                refreshToken,
                DB,
                JWT_ACCESS_SECRET,
                JWT_REFRESH_SECRET
            )
            if (newTokens.accessToken && newTokens.refreshToken) {
                res.set('authorization', newTokens.token)
                res.set('x-refresh-token', newTokens.refreshToken)
            }
            req.user = newTokens.user
        }
    }
    next()
}

app.use(checkTokens)
app.use(
    END_POINT,
    bodyParser.json(),
    graphqlExpress((req) => {
        return {
            schema,
            context: {
                isLoggedIn: _.isEmpty(req.user) ? false : true,
                DB,
                JWT_ACCESS_SECRET,
                JWT_REFRESH_SECRET
            }
        }
    })
)

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(SERVER_PORT, () => {
    console.log(`💥 Server is running at port ${SERVER_PORT} 💥`)
})
