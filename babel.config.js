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
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-export-default-from',
		'ramda',
	],
	babelrcRoots: ['.', './proxy-server/', './sanity-plugin/'],
}
