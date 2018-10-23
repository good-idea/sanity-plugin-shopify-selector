// @flow
import { HttpLink } from 'apollo-link-http'
import {
	makeRemoteExecutableSchema,
	introspectSchema,
	mergeSchemas,
} from 'graphql-tools'
import fetch from 'node-fetch'
import { SHOP_NAME, STOREFRONT_ACCESS_TOKEN } from './config'
import fs from 'fs'
import path from 'path'

const debug = require('debug')('server')

const shopifyLink = new HttpLink({
	uri: `https://${SHOP_NAME}.myshopify.com/api/graphql`,
	fetch,
	headers: {
		'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
	},
})

const SCHEMA_PATH = path.resolve(__dirname, 'cached', 'shopifySchema.json')

const saveSchema = (schema: string) => {
	const timestamp = new Date()
	console.log(Object.keys(schema))
	fs.writeFileSync(SCHEMA_PATH, JSON.stringify({ timestamp, schema }))

	debug(`Saved fresh schema at ${timestamp}`)
}

const fetchRemoteSchema = async () => {
	const remoteSchema = await introspectSchema(shopifyLink)
	saveSchema(remoteSchema)
	return remoteSchema
}

const EXPIRES = 60 * 60 * 1000 // 1 hour

const loadCachedRemoteSchema = async () => {
	if (!fs.existsSync(SCHEMA_PATH)) return false
	const cached = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'))
	if (!cached) return false
	const { timestamp, schema } = cached
	if (Date(timestamp.getTime) + EXPIRES < new Date()) return false
	console.log(Object.keys(schema))
	return schema
}

const getRemoteSchema = async () => {
	const cachedSchema = await loadCachedRemoteSchema()
	if (cachedSchema) return cachedSchema
	const schema = await fetchRemoteSchema()

	return makeRemoteExecutableSchema({
		schema,
		shopifyLink,
	})
}

// Apollo link with the uri of GraphQL API

const buildSchema = async () => {
	// get remote executable schema
	const remoteSchema = await getRemoteSchema()
	return remoteSchema

	// // const localTypeDefs = /* GraphQL */ ``

	// const schemaExtensionResolvers = {}

	// merge the schema along with custom resolvers
	return mergeSchemas({
		schemas: [remoteSchema],
		// resolvers: schemaExtensionResolvers,
	})
}

// const buildSchema = async () => {
// 	return getExecutableSchema()
// }

export default buildSchema
