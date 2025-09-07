const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      clean: true, // Limpia la carpeta output antes de cada build
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
      rules: [
        // JavaScript/Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // SCSS/CSS
        {
          test: /\.(scss|sass|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer'],
                    ...(isProduction ? [['cssnano']] : [])
                  ]
                }
              }
            },
            'sass-loader'
          ]
        },
        // Imágenes
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },
        // Fuentes
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        })
      ] : [])
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3001,
      hot: true,
      open: false,
      watchFiles: ['sections/**/*', 'templates/**/*', 'snippets/**/*']
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    },
    resolve: {
      extensions: ['.js', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'assets'),
        '@sections': path.resolve(__dirname, 'sections'),
        '@snippets': path.resolve(__dirname, 'snippets')
      }
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map'
  };
};