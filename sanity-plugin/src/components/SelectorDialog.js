// @flow
import React from 'react'
import Fetcher from './Fetcher'
import { CardButton } from './Card'
import { Grid } from './Layout'

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
			<h3>Collections</h3>
			<Grid noStretch columns={3}>
				{collections.map(c => (
					<CardButton
						key={c.id}
						type="button"
						onClick={handleClick(c.id)}
						item={c}
					/>
				))}
			</Grid>
			<h3>Products</h3>
			<Grid noStretch columns={3}>
				{products.map(p => (
					<CardButton
						key={p.id}
						type="button"
						onClick={handleClick(p.id)}
						item={p}
					/>
				))}
			</Grid>
		</React.Fragment>
	)
}

/**
 * With Fetched Data
 */
const productsQuery = /* GraphQL */ `
	{
		shop {
			collections(first: 100) {
				edges {
					node {
						id
						handle
						title
						description
						image {
							id
							altText
							originalSrc
							transformedSrc(maxWidth: 100)
						}
					}
				}
			}
			products(first: 200) {
				edges {
					node {
						id
						handle
						title
						description
						images(first: 1) {
							edges {
								node {
									id
									altText
									originalSrc
									transformedSrc(maxWidth: 100)
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
