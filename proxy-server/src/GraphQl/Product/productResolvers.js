// @flow
import { getProductField } from '../utils'
// import { getLink } from '../sharedTypeResolvers'

const resolvers = {
	Product: {
		related: getProductField('related'),
		// related: async (parent, args, context, info) => {
		// 	const relatedItems = await getProductField('related')(parent)
		// 	console.log(relatedItems)
		// 	const linked =
		// 		relatedItems && relatedItems.length
		// 			? await Promise.all(
		// 					relatedItems.map(item =>
		// 						getLink({ link: [item] }, args, context, info),
		// 					),
		// 			  )
		// 			: []
		// 	return linked
		// },
	},
}

export default resolvers
