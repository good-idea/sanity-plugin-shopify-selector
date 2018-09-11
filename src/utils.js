// @flow
import * as R from 'ramda'

export const unwindEdges = (o: Object): Object =>
	R.pipe(
		R.toPairs,
		// Iterate over the properties and their values
		R.reduce(
			(acc, [key, value]) =>
				value && value.edges && Array.isArray(value.edges)
					? // When the value has an 'edges' property that is an array,
					  R.pipe(
							// Pull out the 'pageInfo' prop and rename it
							R.assoc(`${key.replace(/Connection$/, '')}PageInfo`, value.pageInfo || {}),
							// And pluck out the nodes
							R.assoc(key.replace(/Connection$/, ''), R.pluck('node', value.edges).map(unwindEdges)),
					  )(acc)
					: // otherwise, if it's an object (and not null bc null is an object)
					  value && typeof value === 'object'
						? // unwind it
						  R.assoc(key, Array.isArray(value) ? value.map(unwindEdges) : unwindEdges(value))(acc)
						: // lastly, return the value as is
						  R.assoc(key, value)(acc),
			{},
		),
	)(o)
