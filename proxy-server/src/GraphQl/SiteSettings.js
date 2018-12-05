// @flow
import client from '../services/sanity'
import { getLink } from './sharedTypeResolvers'

export const settingsSchema = /* GraphQL */ `
	extend type Query {
		siteSettings: SiteSettings
	}

	type AnnouncementSettings {
		backgroundColor: Color
		link: LinkedItem
		enabled: Boolean!
		text: [TextNode]
	}

	type CheckoutSettings {
		text: [TextNode]
	}

	type ProductSettings {
		text: [TextNode]
	}

	type MailerSettings {
		buttonLabel: String
		footerText: [TextNode]
		popupText: [TextNode]
	}

	type FooterNavigationSettings {
		links: [LinkedItem]
		text: [TextNode]
	}

	type HeaderNavigationSettings {
		links: [LinkedItem]
	}

	type NavigationSettings {
		footer: FooterNavigationSettings
		header: HeaderNavigationSettings
	}

	type SiteSettings {
		announcement: AnnouncementSettings
		checkout: CheckoutSettings
		logo: SanityImage
		mailer: MailerSettings
		navigation: NavigationSettings
		product: ProductSettings
		seo: SEOSettings
		navigation: NavigationSettings
	}
`

export const settingsResolvers = {
	Query: {
		siteSettings: async () => {
			const siteSettings = await client.getById('site-settings')
			return siteSettings
		},
	},
	AnnouncementSettings: {
		link: getLink,
	},
}
