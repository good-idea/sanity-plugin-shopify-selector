// @flow
// import client from '../services/sanity'
import { getAssetField } from './utils'

export const getLink = async (parent, args, context, info) => {
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
	if (!shopifyLink) return null
	return {
		...parentLink,
		...shopifyLink,
	}
}

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
		_ref: parent => parent.asset && parent.asset._ref,
		_type: () => 'image',
		// create a fake 'key', this helps with prop types on the frontend
		_key: parent => parent.asset && parent.asset._ref,
		id: parent => parent.asset && parent.asset._ref,
		altText: async parent => {
			const altText = await getAssetField('altText')(parent)
			return altText || ''
		},
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
		link: getLink,
	},
}
