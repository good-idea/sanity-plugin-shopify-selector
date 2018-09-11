// @flow
import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import SelectedItem from './SelectedItem'
import ShopifySelector from './ShopifySelector'
import Overlay from '../../Components/Overlay'

const createPatchFrom = (value) => PatchEvent.from(value === '' ? unset() : set(value))

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
				// Encode the admin ID with base64 so we can use it on the frontend
				const base64id = btoa(id)
				this.setValue(btoa(base64id))
			},
		)
	}

	setValue = (id: string) => {
		console.log(id)
		this.props.onChange(createPatchFrom(atob(id)))
	}

	clearValue = () => {
		this.props.onChange(createPatchFrom(''))
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
				<SelectedItem value={value || ''} showSelector={this.showSelector} />
				{value !== '' && (
					<button type="button" onClick={this.clearValue}>
						clear
					</button>
				)}
				<input ref={this.inputRef} value={value} />
				{open && (
					<Overlay open={open} handleClose={this.closeSelector}>
						<ShopifySelector selectProduct={this.handleSelectProduct} />
					</Overlay>
				)}
			</div>
		)
	}
}

export default Shopify
