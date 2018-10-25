// @flow
import sanityClient from '@sanity/client'
// import Redis from 'ioredis'
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../config'
import type { Product } from '../types'
import localCache from './cache'

const dummyCache = {
	get: () => false,
	set: () => {},
}

class SanityClient {
	constructor({ projectId, dataset, useCdn, cache }) {
		this.client = sanityClient({
			projectId,
			dataset,
			useCdn,
		})
		this.projectId = projectId
		// if not in development, use the supplied cache,
		// falling back to the dummy cache
		this.cache = (process.env.NODE_ENV !== 'development' && cache) || dummyCache
	}

	getByType = (_type: string) => async (
		itemId: string,
		fields?: Array<string>,
	): Product => {
		const cacheId = `${this.projectId}-${itemId}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_type == $_type && shopifyItem.itemId == $itemId]${queryFields}[0]`
		const result = await this.client.fetch(query, { _type, itemId })
		this.cache.set(cacheId, JSON.stringify(result))
		return result
	}

	getById = async (id: string, fields) => {
		const cacheId = `${this.projectId}-${id}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_id == $id]${queryFields}[0]`
		const result = await this.client.fetch(query, { id })
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
	cache: localCache,
})

export default client
