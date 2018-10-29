// @flow
import client from '../services/sanity'

const getCustomField = (method: 'getCollection' | 'getProduct') => (
	field: string,
) => async (parent: any): any => {
	const fetchedItem = await client[method](parent.itemId || parent.id)
	if (!fetchedItem) return parent[field]
	return fetchedItem[field] || parent[field]
}

export const getCollectionField = getCustomField('getCollection')
export const getProductField = getCustomField('getProduct')

export const getRefField = (field: string) => async parent => {
	const fetched = await client.getById(parent._ref)
	if (!fetched) return parent[field]
	return fetched[field] || parent[field]
}

export const getAssetField = (field: string) => async parent => {
	const fetched = await client.getById(parent.asset._ref)
	if (!fetched) return parent[field]
	return fetched[field] || parent[field]
}
