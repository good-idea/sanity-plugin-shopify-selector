// @flow
import React from 'react'
import Fetcher from './Fetcher'

/**
 * ShopifySelector
 */

type BaseProps = {
	selectProduct: (id: string) => void,
}

type Props = BaseProps & {
	data: {
		shop: {
			collections: Array<{
				id: string,
				title: string,
			}>,
			products: Array<{
				id: string,
				title: string,
			}>,
		},
	},
}

const ShopifySelector = ({ data, selectProduct }: Props) => {
	const handleClick = id => () => selectProduct(id)
	const { products, collections } = data.shop
	return (
		<React.Fragment>
			<h2>Pick it</h2>
			<h3>Collections</h3>
			{collections.map(c => (
				<button key={c.id} type="button" onClick={handleClick(c.id)}>
					{c.title}
				</button>
			))}
			<h3>Products</h3>
			{products.map(p => (
				<button key={p.id} type="button" onClick={handleClick(p.id)}>
					{p.title}
				</button>
			))}
		</React.Fragment>
	)
}

/**
 * With Fetched Data
 */
const productsQuery = /* GraphQL */ `
	{
		shop {
			collections(first: 10) {
				edges {
					node {
						id
						handle
						title
						description
						image {
							altText
							originalSrc
						}
					}
				}
			}
			products(first: 20) {
				edges {
					node {
						id
						handle
						title
						images(first: 1) {
							edges {
								node {
									altText
									originalSrc
								}
							}
						}
					}
				}
			}
		}
	}
`

export default (props: BaseProps) => (
	<Fetcher query={productsQuery}>
		{({ data }) => <ShopifySelector data={data} {...props} />}
	</Fetcher>
)
