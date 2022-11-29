const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};

// Daqui para baixo é copia do front-end

const config = require("./config.js");

const { argv } = require("yargs");
const devMode = argv.mode && argv.mode != "production";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const path = require("path");
const buildPath = path.resolve(__dirname, "./src/dist/");

module.exports = {
  context: path.resolve(__dirname, "./src/assets"),
  entry: {
    'assets/scripts/home': ["./scripts/home.js"],
    'assets/styles/home': ["./styles/home.scss"],
  },
  output: {
    path: buildPath,
    filename: devMode ? "[name].js" : "[name].js",
    chunkFilename: devMode ? "[id].js" : "[id].js",
  },
  // stats: {
  //   hash: true,
  //   version: true,
  //   timings: false,
  //   children: false,
  //   errors: false,
  //   errorDetails: false,
  //   warnings: false,
  //   chunks: false,
  //   modules: false,
  //   reasons: false,
  //   source: false,
  //   publicPath: false,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
        },
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: devMode,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: { path: __dirname, ctx: config },
              sourceMap: devMode,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: devMode,
              sourceComments: devMode,
            },
          },
        ],
      },

      {
        test: /\.(gif|ico|png|jpe?g)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets/images/',
          },
        },
        ],
      },

      // {
      //   // Load all images as base64 encoding if they are smaller than 8192 bytes
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //       {
      //           loader: 'url-loader',
      //           options: {
      //               name: '[name].[ext]',
      //               limit: 8192,
      //               // outputPath: '[path]',
      //               // publicPath: '../img/',
      //               postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
      //           }
      //       }
      //   ]
      // },

      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: devMode ? "assets/svg/sprite.svg" : "assets/svg/sprite.svg",
        },
      },

      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/fonts/',
                publicPath: devMode ? '/assets/fonts/' : '/frontend/dist2/assets/fonts/',
              },
            }
        ]
      },

    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ecma: 5,
    //     minimize: false,
    //     warnings: true,
    //     drop_console: true,
    //   },
    // }),
    new SpriteLoaderPlugin(buildPath),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].css",
      chunkFilename: devMode ? "[id].css" : "[id]-[hash].css",
    }),
    new WebpackAssetsManifest({
      // output: 'assets.json',
      space: 2,
      writeToDisk: false,
      assets: config.manifest,
      transform: (assets) => {
        for (let i in assets) {
          if (/\.woff2?$/.test(i)) {
            delete assets[i];
          }
        }
      }
		}),
    // new FaviconsWebpackPlugin({
    //   // Your source logo (required)
    //   logo: '512x512.png',
    //   prefix: 'src/theme/assets/images/pwa/',
    //   inject: false,
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   },
    //   // Favicons configuration options (see below)
    //   favicons: {}
    // }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ["src/*"],
      server: { baseDir: ['src'] },
      reloadDelay: 0,
    }),
  ],
};