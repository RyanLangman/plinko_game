const path = require('path');

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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};