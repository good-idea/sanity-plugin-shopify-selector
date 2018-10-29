// @flow
import client from '../services/sanity'

export const settingsSchema = /* GraphQL */ `
	extend type Query {
		siteSettings: SiteSettings
	}

	type SiteSettings {
		logo: SanityImage
		seo: SEOSettings
	}
`

export const settingsResolvers = {
	Query: {
		siteSettings: async () => {
			const siteSettings = await client.getById('site-settings')
			return siteSettings
		},
	},
}
