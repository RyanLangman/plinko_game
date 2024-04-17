const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FixDefaultImportPlugin = require("webpack-fix-default-import-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "public" },
        ]),
        new FixDefaultImportPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./build"),
        compress: true,
        port: 5000,
    },
}
