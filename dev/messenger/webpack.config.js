let CopyWebpackPlugin = require('copy-webpack-plugin');
let poststylus = require('poststylus')
let path = require('path');

const config = {
  devServer: {
    outputPath: path.join(__dirname, 'dist'),
    colors: false
  },
  devtool: "source-map",
  entry: {
    app: ['./src/app.ts']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        exclude:[
          '/node_modules/'
        ]
      },
			{
        test: /\.styl$/,
        loader: 'style!css!stylus',
        exclude: [
          '/node_modules/'
        ]
      }
    ],
  },
  loader: {
		use: [
      poststylus(['autoprefixer', 'postcss-short', 'postcss-sorting', 'postcss-cssnext', 'rucksack-css'])
    ]
	},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/public' }])
  ],
  resolve: {
    extensions: ['.ts']
  }
}


module.exports = config;
