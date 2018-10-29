// @flow

type Image = {
	id: string,
	originalSrc: string,
	altText?: string,
	transformedSrc?: string,
}

export type Product = {
	id: string,
	title: string,
	description: string,
	images: Array<Image>,
	__typename: string,
}

export type Collection = {
	id: string,
	title: string,
	description: string,
	image: Image,
	__typename: string,
}

export type ShopifyItem = Product | Collection
