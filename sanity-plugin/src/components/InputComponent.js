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

/**
 * Shopify
 */

type Props = {
	type: {
		title: string,
		// options: Array<'product' | 'collection'>,
	},
	value?: {
		title: string,
		description: string,
		handle: string,
		itemType: string,
		previewImage: string,
	},
	onChange: (value: string) => void,
}

type State = {
	open: boolean,
	caughtError: false,
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
		const { image, images, id, title, description, handle, itemType } = item
		const sourceImage = images && images.length ? images[0] : image
		const previewImage = sourceImage.transformedSrc
		this.props.onChange(
			PatchEvent.from(
				setIfMissing({ _type: 'shopifyItem' }),
				id ? set(id, ['id']) : unset(['id']),
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
		const { value } = this.props
		const { open, caughtError } = this.state
		if (caughtError) {
			return <p>Sorry, i broke it</p>
		}
		return (
			<div>
				{!value || value === '' ? (
					<Button type="button" onClick={this.showSelector}>
						Select an Item
					</Button>
				) : (
					<SelectedWrapper>
						<SelectedItem value={value} />
						<Button type="button" onClick={this.clearValue}>
							<FaTrashAlt />
						</Button>
					</SelectedWrapper>
				)}
				{open && (
					<Overlay open={open} handleClose={this.closeSelector}>
						<SelectorDialog selectProduct={this.handleSelectProduct} />
					</Overlay>
				)}
				<input
					ref={this.inputRef}
					type="hidden"
					value={value}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}

export default ShopifyInput
