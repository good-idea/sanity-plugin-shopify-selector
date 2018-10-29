export const sharedTypeDefs = /* GraphQL */ `
	type SanityAsset {
		_ref: String
	}

	union LinkedItem = Product | Collection | Page

	# Content Blocks

	interface ContentBlock {
		_type: String!
		_key: String!
	}

	type Header implements ContentBlock {
		_key: String!
		_type: String!
		text: String
	}

	type ColorPalette {
		background: String
		foreground: String
		population: Float
		title: String
	}

	type Dimensions {
		aspectRatio: Float
		width: Int
		height: Int
	}

	type Palette {
		darkMuted: ColorPalette
		dominant: ColorPalette
		lightMuted: ColorPalette
		lightVibrant: ColorPalette
		muted: ColorPalette
	}

	type ImageMetadata {
		dimensions: Dimensions
		palette: Palette
	}

	type SanityImage implements ContentBlock {
		_key: String!
		_type: String!
		_ref: String!
		asset: SanityAsset!
		url: String!
		metadata: ImageMetadata!
		size: Int!
	}

	type RichText implements ContentBlock {
		_key: String!
		_type: String!
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
		_key: String!
		_type: String!
		text: String!
		marks: [String]!
	}

	type MarkDef {
		_type: String!
		href: String!
	}

	# type Gallery

	type PageLink implements ContentBlock {
		_key: String!
		_type: String!
		image: SanityImage
		label: String
		link: LinkedItem!
	}

	type SEOSettings {
		name: String
		description: String
		image: SanityImage
		linkLabel: String
	}
`
