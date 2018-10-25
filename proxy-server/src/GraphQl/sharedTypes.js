export const sharedTypeDefs = /* GraphQL */ `
	type SanityAsset {
		_ref: String
	}

	type LinkedShopifyItem {
		_type: String
		itemId: String
	}

	type LinkedPage {
		_type: String
		_ref: String
	}

	union LinkedItem = LinkedShopifyItem | LinkedPage

	# Content Blocks

	interface ContentBlock {
		_type: String
	}

	type Header implements ContentBlock {
		_type: String
		text: String
	}

	type SanityImage implements ContentBlock {
		_type: String
		asset: SanityAsset
	}

	type RichText implements ContentBlock {
		_type: String
		blocks: [TextBlock!]!
	}

	type TextBlock {
		_type: String!
		_key: String!
		children: [TextBlockChild]!
		markDefs: [MarkDef!]!
		style: String!
	}

	type TextBlockChild {
		_type: String!
		text: String!
		marks: [String]!
	}

	type MarkDef {
		_type: String
		href: String
	}

	# type Gallery

	type PageLink implements ContentBlock {
		_type: String
		image: SanityImage
		label: String
		link: [LinkedItem!]!
	}

	type SEOSettings {
		name: String
		description: String
		image: SanityImage
		linkLabel: String
	}
`
