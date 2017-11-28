
# webpack插件

插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用

```javascript
 var webpack = require('webpack');

 module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'build.js'
    },
    module: {
        loaders: [
        {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    plugins:[
        //该插件的作用是打包输出的文件build.js添加标题头
        new webpack.BannerPlugin('This file is created by zhaoda')
    ]
}
```

## webpack通用插件

### DefinePlugin

允许你创建一个在编译时可以配置的**全局常量**。这可能会对开发模式和生产模式的构建允许不同的行为非常有用

```
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})

```

```
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

> 注意，因为这个插件直接做的文本替换,给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')

### HtmlWebpackPlugin

[`HtmlWebpackPlugin`](https://github.com/ampedandwired/html-webpack-plugin)简化了HTML文件的创建，以便为您的 webpack bundle 提供服务。这对于被更改文件的文件名中包含每次编译哈希(hash) 的webpack bundle尤其有用。您可以让插件为您生成一个HTML文件，使用[lodash templates](https://lodash.com/docs#template)提供您自己的模板，或使用自己的[加载器(loader)](http://www.css88.com/doc/webpack2/loaders)。

> 当多个入口（入口分离）这种情况下，更改入口文件的名称生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。我们用 HtmlWebpackPlugin 来解决这个问题。详细请看https://doc.webpack-china.org/guides/output-management/

#### 基本案例

```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};

```

这将生成一个文件 `dist/index.html` ，其包含以下内容：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

#### options

[英文官方文档参考](https://github.com/jantimon/html-webpack-plugin#configuration)

*   title: 生成的HTML模板的title，如果模板中有设置title的名字，则会忽略这里的设置

*   filename: 生成的模板文件的名字

*   **template**: 模板来源文件,[详情参考](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)

*   **inject**: 引入模块的注入位置；取值有true/false/body/head
>  When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element.

*   favicon: 指定页面图标；

*   **minify**: 是`html-webpack-plugin`中集成的 `html-minifier` ，生成模板文件压缩配置，有很多配置项，可以查看[详细文档](https://github.com/kangax/html-minifier#options-quick-reference)

    ```
       caseSensitive: false, //是否大小写敏感
       collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
       collapseWhitespace: true //是否去除空格

    ```

*   hash: 是否生成hash添加在引入文件地址的末尾，类似于我们常用的时间戳，比如最终引入是：`<script type="text/javascript" src="bundle.049424f7d7ea5fa50656.js?049424f7d7ea5fa50656"></script>`。这个可以避免缓存带来的麻烦

*   cache: 是否需要缓存，如果填写true，则文件只有在改变时才会重新生成

*   showErrors: 是否将错误信息写在页面里，默认true，出现错误信息则会包裹在一个`pre`标签内添加到页面上

*   chunks: 引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入

*   chunksSortMode: 引入模块的排序方式

*   excludeChunks: 排除的模块

*   xhtml: 生成的模板文档中标签是否自动关闭，针对xhtml的语法，会要求标签都关闭，默认false

#### Writing Your Own Templates

If the default generated HTML doesn't meet your needs you can supply your own template. The easiest way is to use the `template` option and pass a custom HTML file. The html-webpack-plugin will automatically inject all necessary CSS, JS, manifest and favicon files into the markup.

> htmlWebpackPlugin.options取得的值也可以自定义

```source-js
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: 'my-index.html', // Load a custom template (lodash by default see the FAQ for details),
    a: '自定义'
  })
]
```

`my-index.html`:

```text-html-basic
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div><%= htmlWebpackPlugin.options.a %><div>
  </body>
```

#### 平安车险中应用

分别在`webpack.config.dev.js`和`webpack.config.pro.js`中分别引用该插件，分别在插件里面定义不同的变量，然后在template中判断变量的值，从而分别生成开发环境中的index.html和生产环境中的index.html。

```
// webpack.config.dev.js

new HtmlWebpackPlugin({
  template: '${template}',
  minify: {},
  // loadCss: true,生产环境中写这段
})

```

```
// template index.ejs

<% if(HtmlWebpackPlugin.options.loadCss) { %>
 // 里面的内容只在生产环境中执行

<% } %>

```

### ExtractTextWebpackPlugin

它会将所有的 入口chunk (entry chunks) 中的 require("style.css") 移动到分开的 css 文件。因此，你的样式不再内联到 javascript 里面，但会放到一个单独的 css 包文件 (styles.css)当中。 如果你的样式文件大小较大，这会更快，因为样式文件会跟 javascript 包并行加载。

| 优点 | 缺点 |
| --- | --- |
| 更少 style 标签 (旧版本的 IE 浏览器有限制) | 额外的 HTTP 请求 |
| CSS SourceMap (使用 `devtool: "source-map"` 和 `css-loader?sourceMap` 配置) | 更长的编译时间 |
| CSS 请求并行 | 没有运行时的公共路径修改 |
| CSS 单独缓存 | 没有热替换 |
| 更快的浏览器运行时 (更少代码和 DOM 的运行) | ... |

```
new ExtractTextPlugin(options: filename | object)

```

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| **`id`** | `{String}` | 此插件实例的唯一id。 （仅限高级用途，默认情况下自动生成） |
| **`filename`** | `{String}` | _(必填)_ 生成文件的文件名。会包含 `[name]`, `[id]` 和 `[contenthash]` |
| **`options.allChunks`** | `{Boolean}` | 向所有额外的 chunk 提取（默认只提取初始加载模块） |
| **`options.disable`** | `{Boolean}` | 禁用插件 |
| **`options.ignoreOrder`** | `{Boolean}` | 禁用顺序检查 (对 CSS Modules 有用!), 默认 `false` |

*   `[name]` chunk 的名称
*   `[id]` chunk 的数量
*   `[contenthash]` 提取文件根据内容生成的哈希

> :警告: `ExtractTextPlugin` 对 **每个入口 `chunk` **都生成对应的一个文件, 所以当你配置多个入口 `chunk` 的时候，你必须使用 `[name]`, `[id]` or `[contenthash]`.

### uglifyjs-webpack-plugin

压缩js

```
npm i -D uglifyjs-webpack-plugin
```

```
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  plugins: [
    new UglifyJSPlugin()
  ]
}
```

### CommonsChunkPlugin

```
new webpack.optimize.CommonsChunkPlugin(options)
```

我的理解就是： 项目中有多个页面文件，该插件的作用就是将多个文件入口的公共模块独立出来，形成一个独立的chunk文件，这个文件只是在第一次的时候加载，然后就放在缓存里面，后面用到的话就从缓存里面取，提高响应速度

#### 官网案例

- 公共chunk 用于 入口chunk (entry chunk)

生成一个额外的 chunk 包含入口chunk 的公共模块。

```
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // ( 公共chunk(commnons chunk) 的名称)

  filename: "commons.js",
  // ( 公共chunk 的文件名)

  // minChunks: 3,
  // (模块必须被3个 入口chunk 共享)

  // chunks: ["pageA", "pageB"],
  // (只使用这些 入口chunk)
})

```

你必须在 入口chunk 之前加载生成的这个 公共chunk:

```
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>

```

- 明确第三方库 chunk

将你的代码拆分成公共代码和应用代码。

```
entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"
    // (给 chunk 一个不同的名字)

    minChunks: Infinity,
    // (随着 entry chunk 越来越多，
    // 这个配置保证没其它的模块会打包进 vendor chunk)
  })
]

```

```
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```


## webpack 2 中特有的插件

### LoaderOptionsPlugin

`loader-options-plugin` 和其他插件不同。它的用途是帮助人们从 webpack 1 迁移至 webpack 2。在 webpack 2 中对 `webpack.config.js` 的结构要求变得更加严格；不再开放扩展给其他的加载器/插件。webpack 2 推荐的使用方式是直接传递 `options` 给加载器/插件。换句话说，配置选项将**不是**全局/共享的。

不过，在某个加载器升级为依靠直接传递给它的配置选项运行之前，可以使用 `loader-options-plugin` 来抹平差异。你可以通过这个插件配置全局/共享的加载器配置，使所有的加载器都能收到这些配置。

在将来这个插件可能会被移除。

- 配置

```
new webpack.LoaderOptionsPlugin(options)

```

*   `options.debug` (`boolean`)：加载器是否为 `debug` 模式。`debug` 在 webpack 3 中将被移除。
*   `options.minimize` (`boolean`)：加载器是否要切换到优化模式。
*   `options.options` (`object`)：一个配置对象，用来配置旧的加载器 - 将使用和 `webpack.config.js` 相同的结构。

*   `options.options.context` (`string`)：配置加载器时使用的上下文。

*   其他选项和在 `webpack.config.js` 中一样……

- 示例

```
new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: __dirname
  }
})
```

## webpack 1 中特有的插件


### OccurenceOrderPlugin

我们还可以添加OccurenceOderPlugin插件OccurenceOrderPlugin。

>通过计算模块出现次数来分配模块。这个经常被使用可以较快地获得模块。这使得模块可以预读，建议这样可以减少总文件大小。

事实上，我们是不知道它背后的机制的，但是在目前的测试的webpack2中已经被默认包含了，所以我们不妨引用它。

`new webpack.optimize.OccurrenceOrderPlugin(preferEntry)`
