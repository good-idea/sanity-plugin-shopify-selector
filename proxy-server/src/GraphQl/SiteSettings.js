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
		text: [TextBlock]
	}

	type CheckoutSettings {
		text: [TextBlock]
	}

	type ProductSettings {
		text: [TextBlock]
	}

	type MailerSettings {
		buttonLabel: String
		footerText: [TextBlock]
		popupText: [TextBlock]
	}

	type FooterNavigationSettings {
		links: [LinkedItem]
		text: [TextBlock]
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
