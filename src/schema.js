import InputComponent from './components/InputComponent'
// import PreviewComponent from '../components/PreviewComponent'


export const shopifyItem = {
	title: 'Shopify Item',
	name: 'shopifyItem',
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'text',
		},
		{
			name: 'itemId',
			title: 'Item',
			type: 'string',
			inputComponent: InputComponent,
		},
	],
	preview: {
		select: {
			title: 'name',
		},
	},
}
