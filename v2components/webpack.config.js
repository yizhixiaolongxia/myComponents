module.exports = {
    entry: {
        example: "./demo/inputs.js",
        components: './src/index.js'
    },
    output: {
        path: './build',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
