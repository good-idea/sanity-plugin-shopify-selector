// @flow

const productSchema = /* GraphQL */ `
	extend type Product {
		related: [LinkedItem]
	}
`

export default productSchema
