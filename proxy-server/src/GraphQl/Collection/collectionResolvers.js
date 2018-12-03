// @flow
import { getCollectionField } from '../utils'

const resolvers = {
	Collection: {
		title: getCollectionField('title'),
		description: getCollectionField('description'),
		descriptionHtml: getCollectionField('descriptionHtml'),
		backgroundColor: getCollectionField('backgroundColor'),
		keyColor: getCollectionField('keyColor'),
	},
}

export default resolvers
