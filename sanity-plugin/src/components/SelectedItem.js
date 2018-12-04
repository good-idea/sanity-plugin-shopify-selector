// @flow
import React from 'react'
import Fetcher from './Fetcher'
import Card from './Card'
import type { Product, Collection } from '../types'

/**
 * SelectedItem
 */

type Props = Product | Collection

const missingItem = {
	title: '⚠️ Missing',
	subtitle:
		'This item cannot be found within Shopify. Remove the entry here and link thi spage to an existing Shopify item.',
	image: null,
}

const SelectedItem = ({ item }: Props) => <Card item={item || missingItem} />

/**
 * With Fetched Data
 */

const itemQuery = (id: string) => /* GraphQL */ `
{
	node(id: "${id}") {
		...on Collection {
			itemId: id
			title
			description
			handle
			image {
				id
				altText
				originalSrc
				transformedSrc(maxWidth: 100)
			}
			itemType: __typename
		}

		...on Product {
			itemId: id
			title
			description
			handle
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
			itemType: __typename
		}
	}
}
`

export default (props: BaseProps) => (
	<Fetcher query={itemQuery(props.value.itemId)}>
		{({ data }) => <SelectedItem item={data.node} />}
	</Fetcher>
)
