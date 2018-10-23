// @flow
import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import SelectedItem from './SelectedItem'
import ShopifySelector from './ShopifySelector'
import Overlay from './Overlay'

const createPatchFrom = value =>
	PatchEvent.from(value === '' ? unset() : set(value))

/**
 * Shopify
 */

type Props = {
	type: {
		title: string,
		options: Array<'product' | 'collection'>,
	},
	value?: string,
	onChange: (value: string) => void,
}

type State = {
	open: boolean,
	caughtError: false,
}

class Shopify extends React.Component<Props, State> {
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

	handleSelectProduct = (id: string) => {
		this.setState(
			{
				open: false,
			},
			() => {
				this.setValue(id)
			},
		)
	}

	setValue = (id: string) => {
		this.props.onChange(createPatchFrom(id))
	}

	clearValue = () => {
		this.props.onChange(createPatchFrom(''))
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
			return <h2>Sorry, i broke it</h2>
		}
		return (
			<div>
				{!value || value === '' ? (
					<button type="button" onClick={this.showSelector}>
						Select an Item
					</button>
				) : (
					<React.Fragment>
						<SelectedItem value={value} />
						<button type="button" onClick={this.clearValue}>
							clear
						</button>
					</React.Fragment>
				)}
				{open && (
					<Overlay open={open} handleClose={this.closeSelector}>
						<ShopifySelector selectProduct={this.handleSelectProduct} />
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

export default Shopify
