// @flow
import React from 'react'
import styled from 'styled-components'
import PatchEvent, {
	set,
	unset,
	setIfMissing,
} from 'part:@sanity/form-builder/patch-event'
import { FaTrashAlt } from 'react-icons/fa'
import SelectedItem from './SelectedItem'
import SelectorDialog from './SelectorDialog'
import { Button } from './Generic'
import Overlay from './Overlay'

const SelectedWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Marker = styled.h6`
	${({ level }) => `
		color: ${level === 'error' ? 'red' : 'auto'};
		margin: 0.2em 0; 
		font-weight: normal;
	`};
`

/**
 * Shopify
 */

type ShopifyItemValue = {
	title: string,
	description?: string,
	handle: string,
	itemType: string,
	previewImage?: string,
}

type FieldMarker = {
	level: string,
	type: string,
	item: {
		message: string,
		name: string,
	},
}

type Props = {
	type: {
		title: string,
		// options: Array<'product' | 'collection'>,
	},
	value?: string | ShopifyItemValue,
	onChange: (value: string) => void,
	markers: Array<FieldMarker>,
}

type State = {
	open: boolean,
	caughtError: false,
}

const defaultOptions = {
	collections: true,
	products: true,
}

class ShopifyInput extends React.Component<Props, State> {
	static defaultProps = {
		value: '',
	}

	state = {
		open: false,
		caughtError: false,
	}

	inputRef = React.createRef()

	showSelector = () => {
		this.setState({
			open: true,
		})
	}

	closeSelector = () => {
		this.setState({
			open: false,
		})
	}

	handleSelectProduct = (item: string) => {
		this.setState(
			{
				open: false,
			},
			() => {
				this.setValue(item)
			},
		)
	}

	setValue = item => {
		const { image, images, itemId, title, description, handle, itemType } = item
		const sourceImage = images && images.length ? images[0] : image
		const previewImage = sourceImage ? sourceImage.transformedSrc : null
		this.props.onChange(
			PatchEvent.from(
				setIfMissing({ _type: 'shopifyItem' }),
				itemId ? set(itemId, ['itemId']) : unset(['itemId']),
				title ? set(title, ['title']) : unset(['title']),
				description
					? set(description, ['description'])
					: unset(['description']),
				handle ? set(handle, ['handle']) : unset(['handle']),
				itemType ? set(itemType, ['itemType']) : unset(['itemType']),
				previewImage
					? set(previewImage, ['previewImage'])
					: unset(['previewImage']),
			),
		)
	}

	clearValue = () => {
		this.props.onChange(PatchEvent.from(unset()))
	}

	handleChange = e => {
		this.setValue(e.target.value)
	}

	componentDidCatch(e) {
		console.warn(e)
		this.setState({
			caughtError: true,
		})
	}

	focus() {
		if (this.inputRef.current) this.inputRef.current.focus()
	}

	render() {
		console.log()
		const { value, type, markers } = this.props
		const { open, caughtError } = this.state
		const suppliedOptions = type.options || {}
		const options = {
			...defaultOptions,
			...suppliedOptions,
		}
		console.log(this.props)

		return (
			<div>
				<div>Linked Shopify Item</div>
				{!value || value === '' ? (
					<Button type="button" onClick={this.showSelector}>
						Select an Item
					</Button>
				) : (
					<SelectedWrapper>
						{caughtError ? (
							<p>Sorry, something broke</p>
						) : (
							<SelectedItem value={value} />
						)}
						<Button type="button" onClick={this.clearValue}>
							<FaTrashAlt />
						</Button>
					</SelectedWrapper>
				)}
				{open && (
					<Overlay open={open} handleClose={this.closeSelector}>
						<SelectorDialog
							options={options}
							selectProduct={this.handleSelectProduct}
						/>
					</Overlay>
				)}
				<input
					ref={this.inputRef}
					type="hidden"
					value={value}
					onChange={this.handleChange}
				/>
				{markers &&
					markers.map(m => <Marker level={m.level}>{m.item.message}</Marker>)}
			</div>
		)
	}
}

export default ShopifyInput
