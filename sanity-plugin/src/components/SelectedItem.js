// @flow
import React from 'react'
import Fetcher from './Fetcher'
import Card from './Card'
import type { Product, Collection } from '../types'

/**
 * SelectedItem
 */

type Props = Product | Collection

const SelectedItem = ({ item }: Props) => <Card item={item} />

/**
 * With Fetched Data
 */

const itemQuery = (id: string) => /* GraphQL */ `
{
	node(id: "${id}") {
		...on Collection {
			id
			title
			description
			image {
				id
				altText
				originalSrc
				transformedSrc(maxWidth: 100)
			}
			__typename
		}

		...on Product {
			id
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
			__typename
		}
	}
}
`

export default (props: BaseProps) => (
	<Fetcher query={itemQuery(props.value)}>
		{({ data }) => <SelectedItem item={data.node} />}
	</Fetcher>
)
