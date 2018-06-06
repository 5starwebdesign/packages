const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isTestEnv = env === 'test';

module.exports = function() {
	return {
		presets: [
			! isTestEnv && [ '@babel/preset-env', {
				modules: false,
				targets: {
					browsers: [ 'extends @wordpress/browserslist-config' ],
				},
				useBuiltIns: 'usage',
			} ],
			isTestEnv && [ '@babel/preset-env', {
				useBuiltIns: 'usage',
			} ],
		].filter( Boolean ),
		plugins: [
			'@babel/plugin-proposal-object-rest-spread',
			[ '@babel/plugin-transform-react-jsx', {
				pragma: 'wp.element.createElement',
			} ],
			'@babel/plugin-proposal-async-generator-functions',
			! isTestEnv && '@babel/plugin-transform-runtime',
		].filter( Boolean ),
	};
};
