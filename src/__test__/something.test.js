/* eslint-disable no-undef */
import React from 'react'
import { render } from 'react-testing-library'

// import Component from '../Component'

describe('Component Component', () => {
	it.only('Mounts Correctly', () => {
	/* Arrange */
		const { container } = render(<span />)
	/* Act */
	
	/* Assert */
		expect(container).toMatchSnapshot()
	})
})
