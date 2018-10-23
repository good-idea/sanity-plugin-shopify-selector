import InputComponent from './components/InputComponent'
// import PreviewComponent from '../components/PreviewComponent'

export default {
	title: 'Shopify Item',
	name: 'shopifyItem',
	type: 'object',
	fields: [
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
