// @flow
import client from '../services/sanity'
import { getDocumentField } from './utils'

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
		title: getDocumentField('title'),
		slug: getDocumentField('slug.current'),
		content: getDocumentField('content'),
		banner: getDocumentField('banner'),
		seo: getDocumentField('seo'),
	},
}
