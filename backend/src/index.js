import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import DB from './models/db'
import config from './config'

const { SERVER_PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, END_POINT } = config
let app = express()

app.use(
    END_POINT,
    bodyParser.json(),
    graphqlExpress((req) => {
        return {
            schema,
            context: { DB, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }
        }
    })
)

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(SERVER_PORT, () => {
    console.log(`💥 Server is running at port ${SERVER_PORT} 💥`)
})
