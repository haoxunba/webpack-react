/* 
练习部分：
1. 配合webpack css-loader看看编译之后的样式
2. 多个类名输入
3. 定义全局样式
4. styleName的引入
5. 设置allowMultiple允许设置多个类名
*/

import React,{Component} from 'react';
import CSSModules from 'react-css-modules';
import style from './cssModules.scss';

class CssModules extends React.Component {

  render() {
    return (
      <div>
        <h1 className={`${style.title} ${style.title2} globalTitle css_modules_test`}>通过css modules定义类名</h1>
        <h1 styleName='styleTitle styleTitle2'>通过React css modules定义类名</h1>
      </div>
    )
  }
}

export default CSSModules(CssModules, style, {
  allowMultiple: true
});