// @flow
import { merge } from 'lodash'
import { productSchema, productResolvers } from '../GraphQl/Product'
import { collectionSchema, collectionResolvers } from '../GraphQl/Collection'
import { homepageSchema, homepageResolvers } from '../GraphQl/Homepage'
import { pageSchema, pageResolvers } from '../GraphQl/Page'
import { settingsSchema, settingsResolvers } from '../GraphQl/SiteSettings'
import { sharedTypeDefs } from '../GraphQl/sharedTypes'
import { sharedResolvers } from '../GraphQl/sharedTypeResolvers'

export const typeDefs = [
	//
	productSchema,
	collectionSchema,
	homepageSchema,
	pageSchema,
	settingsSchema,
	sharedTypeDefs,
].join('\n')

export const resolvers = merge(
	//
	{},
	productResolvers,
	collectionResolvers,
	homepageResolvers,
	pageResolvers,
	settingsResolvers,
	sharedResolvers,
)
