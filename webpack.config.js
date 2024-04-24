const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },,
      {
          test: /\.html$/,
          use:{
              loader: 'html-loader'
          }
      },
      {
          test: /\.png$/,
          use: [
              "file-loader",
              {
                  loader: "image-webpack-loader"
              }
          ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'dist/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
      new CopyWebpackPlugin({
          patterns: [
              { from: 'public', to: '' },
          ],
      }),
  ],
};