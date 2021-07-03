const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    '@snowpack/plugin-postcss',
    [
      '@snowpack/plugin-webpack',
      {
        sourceMap: true,
        outputPattern: {
          js: '[name]-[id].js',
          css: '[name]-[id].css',
        },
        extendConfig: (config) =>  {
          config.entry = [path.resolve(__dirname, 'src', 'index.js')]
          config.output = {
            path: path.resolve(__dirname, 'build')
          }
          config.module = {
            rules: [
              {
                test: /\.(css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'postcss-loader', // postcss loader needed for tailwindcss
                    options: {
                      postcssOptions: {
                        ident: 'postcss',
                        plugins: [tailwindcss, autoprefixer],
                      },
                    },
                  },
                ],
              },
            ]
          }
          config.optimization = {
            minimize: true,
            minimizer: [
              // Webpack extend existing minifiers
              //  '...',
              new CssMinimizerPlugin()
            ]
          }
          config.plugins = [
            new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'index.html'),
              filename: 'hola.html'
            }),
            new MiniCssExtractPlugin({
              filename: 'styles/[name].[contenthash].css',
              chunkFilename: '[id].css',
            })
          ]

          return config
        },
        manifest: true,
        htmlMinifierOptions: true,
        minifyCSS: true
      },
    ],
  ]
};
