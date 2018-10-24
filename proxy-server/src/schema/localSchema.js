// @flow
import { productSchema, productResolvers } from '../GraphQl/Product'

export const typeDefs = [productSchema].join('\n')

export const resolvers = {
	...productResolvers,
}
