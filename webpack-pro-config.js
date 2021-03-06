/**
 * 产品模式下的webpack配置
 *
 * 注意。两种模式的配置有较大差异！！
 */
var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// webpack中生成HTML的插件，

module.exports = {
  entry: {
    // 配合CommonsChunkPlugin将第三方库提取成独立的chunk
    vendor: [
      'react',
      'react-dom'
    ],
    index: './src/index'
  },
  // 页面入口文件配置

  output: {
  // 文件输出配置

    path: path.join(__dirname, 'dist'),
    // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它.

    publicPath: '',
    // 模板、样式、脚本、图片等资源对应的server上的路径

    filename: 'bundle.js'
    // 命名生成的JS
  },

  plugins: [
    new UglifyJsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
    // 'vendor.js' 就是把自己写的相关js打包到bundle.js中

    new HtmlWebpackPlugin({
      template:'src/index.html',
      // html模板的路径
      
      title: '产品模式',
      
      filename:'index.html',
      // 文件名以及文件将要存放的位置

      favicon:'./src/favicon.ico',
      // favicon路径
      
      inject:'body',
      // js插入的位置，true/'head'  false/'body'

      chunks: ['vendor', 'index' ],
      // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

      hash:true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

      minify:{
      // 压缩HTML文件
        removeComments:true,
        // 移除HTML中的注释

        collapseWhitespace:true
        // 删除空白符与换行符
      }
    })
  ],

  resolve: {
    // 实际就是自动添加后缀，默认是当成js文件来查找路径
    // 空字符串在此是为了resolve一些在import文件时不带文件扩展名的表达式
    extensions: ['*', '.js', 'jsx'],

    // 路径别名, 懒癌福音
    alias:{
			app:path.resolve(__dirname,'src/js'),
			// 以前你可能这样引用 import { Nav } from '../../components'
			// 现在你可以这样引用 import { Nav } from 'app/components'

			style:path.resolve(__dirname,'src/styles')
			// 以前你可能这样引用 import "../../../styles/mixins.scss"
			// 现在你可以这样引用 import "style/mixins.scss"

			// 注意：别名只能在.js文件中使用。
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/js'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1 ,// 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ]
      },
      // 上面是组件内部样式，需要通过modules进行私有化设置
      
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // 上面是公共样式

      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10000'
            }
          }
        ]
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10000'
            }
          }
        ]
      }
    ]
  }
};