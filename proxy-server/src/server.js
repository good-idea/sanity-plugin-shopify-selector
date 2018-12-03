// @flow
import { GraphQLServer } from 'graphql-yoga'
import buildSchema from './schema'
import { PORT } from './config'

const debug = require('debug')('server')

const runServer = async (port: number = 3000) => {
	const { context, schema } = await buildSchema()
	const server = new GraphQLServer({ schema, context })

	server.start({ port }, () => {
		debug(`Server running on port ${port}`)
	})
}

const run = () => {
	const port = parseInt(PORT, 10) || 3000
	runServer(port)
	debug(`[${process.env.NODE_ENV}] Server running on port ${port}`)
}

export default run
