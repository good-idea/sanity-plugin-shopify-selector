// @flow
import {
	makeRemoteExecutableSchema,
	introspectSchema,
	mergeSchemas,
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { SHOP_NAME, STOREFRONT_ACCESS_TOKEN } from '../config'
import { typeDefs, resolvers } from './localSchema'

const shopifyLink = new HttpLink({
	uri: `https://${SHOP_NAME}.myshopify.com/api/graphql`,
	fetch,
	headers: {
		'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
	},
})

const createRemoteExecutableSchema = async () => {
	const remoteSchema = await introspectSchema(shopifyLink)
	const remoteExecutableSchema = makeRemoteExecutableSchema({
		schema: remoteSchema,
		link: shopifyLink,
	})
	return remoteExecutableSchema
}

const buildSchema = async () => {
	const remoteSchema = await createRemoteExecutableSchema()
	// merge the schema along with custom resolvers
	const merged = mergeSchemas({
		schemas: [remoteSchema, typeDefs],
		resolvers,
	})
	const context = {
		subSchemas: {
			shopify: remoteSchema,
		},
	}
	return {
		schema: merged,
		context,
	}
}

export default buildSchema
