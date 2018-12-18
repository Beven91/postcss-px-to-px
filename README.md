## postcss-px-to-px

[![NPM version][npm-image]][npm-url]

### 一、简介

基于`postcss` 转换 `px` 到 `px`,主要用于解决在不同设计稿下，统一转换像素值。

### 二、安装

    npm install postcss-px-to-px --save-dev

### 三、使用

Webpack 简单配置

```js
var pxtopx  = require('postcss-px-to-px');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        include: /antd|antd-mobile/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // 2px =  2 * times(2)  = 4 px;
                pxtopx({ times: 2 }),
              ],
            },
          },
        ]
      }
    ]
  }
}
```

### 四、开源许可

基于 [MIT License](http://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。

[npm-url]: https://www.npmjs.com/package/postcss-px-to-px
[npm-image]: https://img.shields.io/npm/v/postcss-px-to-px.svg
