// @flow
import { getCollectionField } from '../utils'

const resolvers = {
	Collection: {
		title: getCollectionField('title'),
		description: getCollectionField('description'),
		descriptionHtml: getCollectionField('descriptionHtml'),
	},
}

export default resolvers
