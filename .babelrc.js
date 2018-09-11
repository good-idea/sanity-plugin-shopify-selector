const path = require('path')

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['last 2 versions'],
				},
			},
		],
		'@babel/preset-react',
	],
	env: {
		development: {
			plugins: ['flow-react-proptypes', 'react-hot-loader/babel'],
		},
		production: {
			plugins: ['graphql-tag'],
		},
	},
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				extensions: ['.js', '.web.js', '.native.js'],
				alias: {
					Components: './src/Components',
					Views: './src/Views',
					Types: './src/Types',
					Utils: './src/Utils',
					GraphQL: './src/GraphQL',
				},
				cwd: 'babelrc',
			},
		],
		'import-graphql',
		'babel-plugin-styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-export-default-from',
		'graphql-tag',
		'ramda',
	],
}
