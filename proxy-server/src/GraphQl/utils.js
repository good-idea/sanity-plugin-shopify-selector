// @flow
import * as R from 'ramda'
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
	const id = parent._id || parent._ref
	if (!id) throw new Error('This item does not have a ref or id')
	const fetched = await client.getById(id)
	if (!fetched) return parent[field]
	const fieldPath = field.split('.')
	return R.path(fieldPath, fetched) || R.path(fieldPath, parent)
}

export const getAssetField = (field: string) => async parent => {
	const fetched = await client.getById(parent.asset._ref)
	if (!fetched) return parent[field]
	return fetched[field] || parent[field]
}
