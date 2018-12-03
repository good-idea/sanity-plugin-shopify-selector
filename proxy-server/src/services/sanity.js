// @flow
import sanityClient from '@sanity/client'
// import Redis from 'ioredis'
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../config'
import type { Product, Collection } from '../types'
import localCache from './cache'
const debug = require('debug')('server')

const dummyCache = {
	set: () => undefined,
	get: () => undefined,
}

type Cache = {
	set: (string, string) => ?string,
	get: string => void,
}

type Config = {
	projectId: string,
	dataset: string,
	useCdn: boolean,
	cache: Cache,
}

class SanityClient {
	projectId: string

	cache: Cache

	client: typeof sanityClient

	constructor({ projectId, dataset, useCdn, cache }: Config) {
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
	): Promise<Product | Collection | null> => {
		const cacheId = `${this.projectId}-${itemId}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_type == $_type && shopifyItem.itemId == $itemId]${queryFields}[0]`
		const result = await this.client.fetch(query, { _type, itemId })
		if (!result) return null
		this.cache.set(cacheId, JSON.stringify(result))
		return result
	}

	getById = async (id: string, fields?: Array<string>) => {
		const cacheId = `${this.projectId}-${id}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_id == $id]${queryFields}[0]`
		const result = await this.client.fetch(query, { id })
		if (!result) return null
		this.cache.set(cacheId, JSON.stringify(result))
		return result
	}

	getProduct = this.getByType('product')

	getCollection = this.getByType('collection')

	getPage = async (slug: string, fields?: Array<string>) => {
		const cacheId = `${this.projectId}-page-${slug}`
		const cached = this.cache.get(cacheId)
		if (cached) return JSON.parse(cached)
		const queryFields = fields ? `{${fields.join(' ')}}` : ''
		const query = `*[_type == "page" && slug == "$slug"]${queryFields}[0]`
		const result = await this.client.fetch(query, { slug })
		if (!result) return null
		this.cache.set(cacheId, JSON.stringify(result))
		return result
	}
}

debug(`[${process.env.NODE_ENV}] Sanity: using dataset ${SANITY_DATASET}`)

const client = new SanityClient({
	projectId: SANITY_PROJECT_ID || '',
	dataset: SANITY_DATASET || '',
	useCdn: process.env.NODE_ENV !== 'development',
	cache: localCache,
})

export default client
