// @flow
import * as React from 'react'
import styled from 'styled-components'

const BackgroundWrapper = styled.button`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 1;
`

const Outer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 200;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Inner = styled.div`
	background-color: white;
	width: calc(100% - 50px);
	max-width: 700px;
	position: relative;
	z-index: 2;
`

const Background = (props) => <BackgroundWrapper type="button" {...props} />

/**
 * Overlay
 */
type Props = {
	open: boolean,
	handleClose: () => void,
	children: React.Node,
}

const Overlay = ({ open, handleClose, children }: Props) =>
	open ? (
		<Outer>
			<Background onClick={handleClose} />
			<Inner>{children}</Inner>
		</Outer>
	) : null

export default Overlay
