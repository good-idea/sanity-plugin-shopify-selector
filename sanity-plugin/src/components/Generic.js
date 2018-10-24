// @flow
import styled from 'styled-components'
import { baseCardStyles } from './styles'

export const Button = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	transition: 0.15s;
	${baseCardStyles};

	&:hover {
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
		transform: translateY(-1px);
		border-color: darkGray;
	}
`
