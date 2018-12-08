// @flow

const productSchema = /* GraphQL */ `
	extend type Product {
		related: [PageLink]
	}
`

export default productSchema
