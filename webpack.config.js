const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  output,
  plugins: [new HtmlWebpackPlugin({
    template: './client/index.html'
  })],
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
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: ["file-loader"]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};