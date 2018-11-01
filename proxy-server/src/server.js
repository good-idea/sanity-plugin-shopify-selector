// @flow
import { GraphQLServer } from 'graphql-yoga'
import buildSchema from './schema'
import { PORT } from './config'

const debug = require('debug')('server')

const port = PORT || 3000

const formatError = error => {
	console.log(error)
	throw new Error('!')
}

const runServer = async () => {
	const { context, schema } = await buildSchema()
	const server = new GraphQLServer({ schema, context, formatError })

	// server.express.use(getCurrentViewer)
	server.start({ port }, () => {
		debug(`Server running on port ${port}`)
	})
}

runServer()
