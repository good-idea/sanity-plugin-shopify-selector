// @flow
import React from 'react'

/**
 * SelectedItem
 */

type Props = {
	value: string,
	showSelector: () => void,
}

const SelectedItem = ({ value, showSelector }: Props) => {
	return !value || value === '' ? (
		<button type="button" onClick={showSelector}>
			+ Pick an item
		</button>
	) : (
		<h1>current value: {value}</h1>
	)
}

export default SelectedItem
