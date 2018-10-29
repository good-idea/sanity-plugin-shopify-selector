// @flow
import client from '../services/sanity'

export const homepageSchema = /* GraphQL */ `
	extend type Query {
		homepage: Homepage
	}

	type Homepage {
		title: String
		content: [ContentBlock]
		banner: SanityImage
		seo: SEOSettings
	}
`

export const homepageResolvers = {
	Query: {
		homepage: async () => {
			const homepage = await client.getById('homepage')
			return homepage
		},
	},
}
