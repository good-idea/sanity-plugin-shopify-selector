// @flow
import { merge } from 'lodash'
import { productSchema, productResolvers } from '../GraphQl/Product'
import { homepageSchema, homepageResolvers } from '../GraphQl/Homepage'
import { sharedTypeDefs } from '../GraphQl/sharedTypes'
import { sharedResolvers } from '../GraphQl/sharedTypeResolvers'

export const typeDefs = [
	//
	productSchema,
	homepageSchema,
	sharedTypeDefs,
].join('\n')

export const resolvers = merge(
	//
	{},
	productResolvers,
	homepageResolvers,
	sharedResolvers,
)
