// @flow

const collectionSchema = /* GraphQL */ `
	extend type Collection {
		keyColor: Color
		backgroundColor: Color
		backgroundImage: SanityImage
	}
`

export default collectionSchema
