// import webpack from "webpack"
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    // resolve: {
    //     alias: {
    //         "date-fns-locale": path.dirname(require.resolve("./node_modules/date-fns/package.json")),
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        }),
        // new webpack.ContextReplacementPlugin(
        //     /date-fns[/\\]locale/,
        //     new RegExp(`(${locales.join("|")})\.js$}`)
        // ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}