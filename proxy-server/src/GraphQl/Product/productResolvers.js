// @flow
import client from '../../services/sanity'

const getCustomField = (field: string) => async parent => {
	const product = await client.getProduct(parent.id)
	return product && product[field] ? product[field] : parent[field]
}

const resolvers = {
	Product: {
		title: getCustomField('title'),
		description: getCustomField('description'),
		something: getCustomField('something'),
	},
}

export default resolvers
