// @flow

type Image = {
	id: string,
	originalSrc: string,
	altText?: string,
	transformedSrc?: string,
}

export type Product = {
	itemId: string,
	title: string,
	handle: string,
	description: string,
	images: Array<Image>,
	itemType: 'Product',
}

export type Collection = {
	itemId: string,
	title: string,
	handle: string,
	description: string,
	image: Image,
	itemType: 'Collection',
}
