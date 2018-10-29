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
		content: [ContentBlock]
		banner: SanityImage
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
		content: getRefField('content'),
		banner: getRefField('banner'),
		seo: getRefField('seo'),
	},
}
