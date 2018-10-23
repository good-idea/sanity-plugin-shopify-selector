// @flow
import React from 'react'
import Fetcher from './Fetcher'

/**
 * SelectedItem
 */

type Props = {
	value: string,
}

const SelectedItem = ({ value }: Props) => <h1>current value: {value}</h1>

/**
 * With Fetched Data
 */

const itemQuery = (id: string) => /* GraphQL */ `
{
	node(id: "${id}") {
		...on Collection {
			id
			title
			image {
				altText
				originalSrc
			}
			__typename
		}

		...on Product {
			id
			title
			images(first: 1) {
				edges {
					node {
						altText
						originalSrc
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
		{({ data }) => <SelectedItem item={data.node} {...props} />}
	</Fetcher>
)
