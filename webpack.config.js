const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project-name.bundle.js'
  },
  devServer: {
    static: './dist',
    compress: true,
    port: process.env.PORT ?? 3000,
    allowedHosts: 'all',
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/index.html'
    })

  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
      utils: path.resolve(__dirname, 'src/utils'),
      api: path.resolve(__dirname, 'src/api'),
      data: path.resolve(__dirname, 'src/data'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/store'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      router: path.resolve(__dirname, 'src/router')
    }
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ],
        exclude: [/(node_modules)/]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      { test: /\.handlebars$/, loader: 'handlebars-loader' }
    ]
  }
}
