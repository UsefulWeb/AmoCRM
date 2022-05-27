module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-javascript',
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        'babel-plugin-transform-javascript-metadata',
    ]
};