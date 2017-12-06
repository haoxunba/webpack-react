import React,{Component} from 'react';
/* 
基本高阶函数(higher-order component (HOC))
return的组件同样有自己的生命周期
可以把props传给WrappedComponent(被包装的组件)

另外一个知识点：
其实，mountComponent 本质上是通过 递归渲染 内容的，
由于递归的特性，父组件的 componentWillMount 一定在其子组件的 componentWillMount 之前调用，
而父组件的 componentDidMount 肯定在其子组件的 componentDidMount 之后调用。
通过在Hoc和usual中都定义这两个周期可以验证
*/

/* const simpleHoc = WrappedComponent => {
  console.log('simpleHoc'); // 最先执行
  return class extends Component {
    componentWillMount() {
      console.log('hoc componentWillMount');
    }
    componentDidMount() {
      console.log('hoc componentDidMount');
    }
    render() {
      // return <WrappedComponent {...this.props}/>
      return <WrappedComponent hocProps="test"/>
    }
  }
}
export default simpleHoc; */

/* 
高阶函数存在两种模式，一种是属性代理，一种是反向继承
属性代理
通过hoc包装wrappedComponent，也就是例子中的Usual，本来传给Usual的props，都在hoc中接受到了，也就是props proxy。 由此我们可以做一些操作
可以理解为正向继承，即被包装组件(wrapedComponent)可以继承包装组件(HOC)的props
属性代理可以分为三种
第一种
操作props
最直观的就是接受到props，我们可以做任何读取，编辑，删除的很多自定义操作。包括hoc中定义的自定义事件，都可以通过props再传下去。
*/

const propsProxyHoc = WrappedComponent => class extends Component {
  
    handleClick() {
      console.log('click');
    }
  
    render() {
      return (<WrappedComponent
        {...this.props}
        handleClick={this.handleClick}
      />);
    }
  };
  export default propsProxyHoc;