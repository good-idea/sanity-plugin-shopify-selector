// @flow
import { GraphQLServer } from 'graphql-yoga'
import buildSchema from './schema'
import { PORT } from './config'

const debug = require('debug')('server')

const port = PORT || 3000

const runServer = async () => {
	const { context, schema } = await buildSchema()
	const server = new GraphQLServer({ schema, context })

	// server.express.use(getCurrentViewer)
	server.start({ port }, () => {
		debug(`Server running on port ${port}`)
	})
}

runServer()
