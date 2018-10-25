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
	type: 'Product',
}

export type Collection = {
	id: string,
	title: string,
	description: string,
	image: Image,
	type: 'Collection',
}
