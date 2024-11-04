const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './JavaScript/game.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Template HTML file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '.'), // Serve files from root
    },
    historyApiFallback: true, // Fallback to index.html for SPAs
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Use Babel preset for ES6+ compatibility
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Loaders for CSS
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Match image files
        type: 'asset/resource', // Treat images as assets
      },
    ],
  },
};
