const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
  filename: 'bundle.js',
};

const entry = [
  './client/index.js'
];

module.exports = {
  mode: process.env.NODE_ENV,
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: false,
  plugins: [new HtmlWebpackPlugin({
    template: './client/index.html'
  }),
  new webpack.SourceMapDevToolPlugin({ filename: '[file].map[query]' })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/login': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
      '/plaid': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
      '/charityAPI': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
      '/banks': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: 'image-webpack-loader'
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss', 'jpg', 'png', 'css']
  },
};