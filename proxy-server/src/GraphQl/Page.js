// @flow
import client from '../services/sanity'
import { getRefField } from './utils'

export const pageSchema = /* GraphQL */ `
	input GetPageInput {
		slug: String!
	}

	extend type Query {
		page(input: GetPageInput!): Page
	}

	type Page {
		title: String!
		slug: String!
		content: [TextNode]
		banner: [SanityImage]
		seo: SEOSettings
	}
`

export const pageResolvers = {
	Query: {
		page: async (_, args) => {
			return client.getPage(args.input.slug)
		},
	},
	Page: {
		title: getRefField('title'),
		slug: getRefField('slug.current'),
		content: getRefField('content'),
		banner: getRefField('banner'),
		seo: getRefField('seo'),
	},
}
