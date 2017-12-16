import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import DB from './models/db'
import config from './config'

const PORT = 3000
let app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { DB } }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 💥`)
})
