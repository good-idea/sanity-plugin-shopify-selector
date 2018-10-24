// @flow

import styled from 'styled-components'

export const Grid = styled.div`
	${({ columns, noStretch }) => `
		display: grid;
		grid-column-gap: 5px;
		grid-row-gap: 5px;
		grid-template-columns: repeat(${columns || 3}, 1fr);

		${noStretch &&
			`
			> * {
				min-width: 0; // prevent columns from resizing to content
			}
		`}
	`};
`
