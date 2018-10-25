export const sharedResolvers = {
	ContentBlock: {
		__resolveType: obj => {
			switch (obj._type) {
				case 'pageLink':
					return 'PageLink'
				case 'header':
					return 'Header'
				case 'richText':
					return 'RichText'
				case 'gallery':
					return 'Gallery'
				case 'image':
					return 'SanityImage'
				default:
					return null
			}
		},
	},
}
