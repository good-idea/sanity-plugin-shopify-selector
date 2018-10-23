// @flow
import * as React from 'react'
import axios from 'axios'
import { unwindEdges } from '../utils'

/**
 * Fetcher
 */

type Props = {
	query: string,
	children: ({ data: {} }) => React.Node,
}

type State = {
	fetching: boolean,
	errored: boolean,
	networkError: boolean,
	data: any,
}

class Fetcher extends React.Component<Props, State> {
	state = {
		fetching: true,
		errored: false,
		data: {},
	}

	componentDidMount = () => {
		this.loadQuery()
	}

	loadQuery = async () => {
		const { query } = this.props
		try {
			const response = await axios.request({
				url: 'http://localhost:3000/graphql',
				method: 'POST',
				data: { query },
			})
			const data = unwindEdges(response.data)

			this.setState({
				data,
				errored: false,
				fetching: false,
			})
		} catch (e) {
			this.setState({
				fetching: false,
				errored: true,
			})
		}
	}

	render() {
		const { fetching, errored, data } = this.state
		const { children } = this.props
		if (fetching) return <h2>Loading...</h2>
		if (errored) return <h3>Sorry, an error occurred. Check your console.</h3>
		return children({ data })
	}
}

export default Fetcher
