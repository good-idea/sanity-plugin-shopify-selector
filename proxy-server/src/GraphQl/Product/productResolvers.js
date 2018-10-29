// @flow
import { getProductField } from '../utils'

const resolvers = {
	Product: {
		title: getProductField('title'),
		description: getProductField('description'),
	},
}

export default resolvers
