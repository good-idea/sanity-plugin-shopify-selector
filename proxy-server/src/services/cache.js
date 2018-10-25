// @flow
import NodeCache from 'node-cache'

const localCache = new NodeCache({
	stdTTL: 60 * 60, // Expires in 1 hour. TODO: figure out how to bust this
})

export default localCache
