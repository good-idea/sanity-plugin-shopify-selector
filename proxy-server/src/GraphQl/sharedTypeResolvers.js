// @flow
// import client from '../services/sanity'
import { getAssetField } from './utils'

export const sharedResolvers = {
	ContentBlock: {
		__resolveType: obj => {
			switch (obj._type) {
				case 'pageLink':
					return 'PageLink'
				case 'header':
					return 'Header'
				case 'richText':
					return 'RichText'
				case 'gallery':
					return 'Gallery'
				case 'image':
					return 'SanityImage'
				default:
					return null
			}
		},
	},
	SanityImage: {
		_ref: parent => parent.asset._ref,
		url: getAssetField('url'),
		metadata: getAssetField('metadata'),
		size: getAssetField('size'),
	},
	LinkedItem: {
		__resolveType: obj => {
			switch (obj._type) {
				case 'shopifyItem':
					return obj.itemType
				case 'page':
					return 'Page'
				default:
					return null
			}
		},
	},
	PageLink: {
		link: async (parent, args, context, info) => {
			const parentLink = parent.link[0]
			if (parentLink._type !== 'shopifyItem') return parentLink
			const shopifyLink = await info.mergeInfo.delegateToSchema({
				schema: context.subSchemas.shopify,
				operation: 'query',
				fieldName: 'node',
				args: {
					id: parentLink.itemId,
				},
				context,
				info,
			})
			return {
				...parentLink,
				...shopifyLink,
			}
		},
	},
}
