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
			collections?: Array<{
				id: string,
				title: string,
			}>,
			products?: Array<{
				id: string,
				title: string,
			}>,
		},
	},
}

const ShopifySelector = ({ data, selectProduct }: Props) => {
	// console.log(data)
	// return null
	const handleClick = item => () => selectProduct(item)
	const { products, collections } = data.shop
	return (
		<React.Fragment>
			{collections && (
				<React.Fragment>
					<h3>Collections</h3>
					<Grid noStretch columns={3}>
						{collections.map(c => (
							<CardButton
								key={c.id}
								type="button"
								onClick={handleClick(c)}
								item={c}
							/>
						))}
					</Grid>
				</React.Fragment>
			)}
			{products && (
				<React.Fragment>
					<h3>Products</h3>
					<Grid noStretch columns={3}>
						{products.map(p => (
							<CardButton
								key={p.id}
								type="button"
								onClick={handleClick(p)}
								item={p}
							/>
						))}
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

/**
 * With Fetched Data
 */

const productsFragment = /* GraphQL */ `
	products(first: 200) {
		edges {
			node {
				itemId: id
				handle
				title
				description
				itemType: __typename
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
`

const collectionsFragment = /* GraphQL */ `
	collections(first: 100) {
		edges {
			node {
				itemId: id
				handle
				title
				description
				itemType: __typename
				image {
					id
					altText
					originalSrc
					transformedSrc(maxWidth: 100)
				}
			}
		}
	}
`

export default ({ options, ...props }: BaseProps) => {
	console.log(options)
	const query = `{
		shop {
			${options.collections ? collectionsFragment : ''}
			${options.products ? productsFragment : ''}
		}
	}`
	console.log(query)
	return (
		<Fetcher query={query}>
			{({ data }) => <ShopifySelector data={data} {...props} />}
		</Fetcher>
	)
}
