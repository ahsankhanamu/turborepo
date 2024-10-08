const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    mainContentScript: './src/content/mainContentScript.js',
    iframeContentScript: './src/content/iframeContentScript.js',
    background: './src/background/index.js',
    devtools: './src/devtools/index.js',
    popup: './src/popup/index.js',
    options: './src/options/index.js',
    sidebar: './src/sidebar/index.js',
    sidepanel: './src/sidepanel/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS to a file
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: './src/options/options.html',
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: './src/devtools/devtools.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
    }),
    new HtmlWebpackPlugin({
      template: './src/sidepanel/sidepanel.html',
      filename: 'sidepanel.html',
      chunks: ['sidepanel'],
    }),
    new HtmlWebpackPlugin({
      template: './src/sidebar/sidebar.html',
      filename: 'sidebar.html',
      chunks: ['sidebar'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/icons', to: 'icons' },
        { from: 'src/widget.js', to: 'widget.js' },
        { from: 'src/iframe-shared-worker.js', to: 'iframe-shared-worker.js' },
        { from: 'src/styles.css', to: 'styles.css' },
        { from: 'src/css/*', to: 'css/[name][ext]' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'common.styles.css', // Output a single styles file
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
