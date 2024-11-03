const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './JavaScript/game.js', // Update this to the entry point in your JavaScript folder
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Reference the main HTML file at the root
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '.'), // Serve files from the root directory
    },
    historyApiFallback: true, // Ensure all routes fallback to index.html
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
