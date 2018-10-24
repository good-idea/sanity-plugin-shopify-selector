// @flow
import sanityClient from '@sanity/client'
// import Redis from 'ioredis'
import NodeCache from 'node-cache'
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../config'
import type { Product } from '../types'

class SanityClient {
	constructor({ projectId, dataset, useCdn }) {
		this.client = sanityClient({
			projectId,
			dataset,
			useCdn,
		})
		this.projectId = projectId
		this.cache = new NodeCache({
			stdTTL: 60 * 60, // Expires in 1 hour. TODO: figure out how to bust this
		})
	}

	getByType = (_type: string) => async (
		itemId: string,
		fields?: Array<string>,
	): Product => {
		const cacheId = `${this.projectId}-${itemId}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_type==$_type && shopifyItem.itemId == $itemId]${queryFields}[0]`
		const result = await this.client.fetch(query, { _type, itemId })
		this.cache.set(cacheId, JSON.stringify(result))
		return result
	}

	getProduct = this.getByType('product')

	getCollection = this.getByType('collection')
}

const client = new SanityClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	useCdn: false,
})

export default client
