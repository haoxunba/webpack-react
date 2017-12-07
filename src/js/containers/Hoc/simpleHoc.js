import React,{Component} from 'react';
/* 
阅读该组件提前注意事项
主要参考https://github.com/sunyongjian/blog/issues/25
*/

/* 
基本高阶函数(higher-order component (HOC))
return的组件同样有自己的生命周期
可以把props传给WrappedComponent(被包装的组件)

另外一个知识点：
其实，mountComponent（挂载组件） 本质上是通过 递归渲染 内容的，
由于递归的特性，父组件的 componentWillMount 一定在其子组件的 componentWillMount 之前调用，
而父组件的 componentDidMount 肯定在其子组件的 componentDidMount 之后调用。
这里通过在Hoc和usual中都定义这两个周期可以验证
*/

const simpleHoc = WrappedComponent => {
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
export default simpleHoc;

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

/* const propsProxyHoc = WrappedComponent => class extends Component {
  
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
  export default propsProxyHoc; */

  /* 
  第二种
  通过ref包装组件获取被包装组件实例,从而可以获取 被包装组件的props和state 
  注意这里面获取到的props不包括hoc传给wrappedComponent
  */
  
/*   const refHoc = WrappedComponent => class extends Component {
  
    componentDidMount() {
      console.log(this.instanceComponent, 'instanceComponent');
    }
  
    render() {
      return (<WrappedComponent
        {...this.props}
        ref={instanceComponent => this.instanceComponent = instanceComponent}
      />);
    }
  };
  
  export default refHoc; */

  /* 
  第三种
  不通过上面的ref方法获取被包装组件实例的state
  考虑到hoc的主要作用就是处理数据，所以有一种情况会用到下面这种方法，就是受控组件
  */
  
/*   const formCreate = WrappedComponent => class extends Component {
  
    constructor() {
      super();
      this.state = {
        fields: {},
      }
    }
  
    onChange = key => e => {
      // 下面这种写法的好处就是，当只输入账户input时，fields对象只存储一个键值对，当再输入密码input时，fields又变为两个属性
      this.setState({
        fields: {
          ...this.state.fields,
          [key]: e.target.value,
        }
      },()=>{
        console.log(this.state.fields);
      })
    }
  
    handleSubmit = () => {
      console.log(this.state.fields);
    }
  
    getField = fieldName => {
      return {
        onChange: this.onChange(fieldName),
      }
    }
  
    render() {
      const props = {
        ...this.props,
        handleSubmit: this.handleSubmit,
        getField: this.getField,
      }
  
      return (<WrappedComponent
        {...props}
      />);
    }
  };
  export default formCreate; */

  /* 
  上面提到了高阶组件有两种模式。一种是属性代理，一种是反向继承
  反向继承(Inheritance Inversion)，简称II，又分为两种方式
  第一种方式是普通方式
  通过继承WrappedComponent，除了一些静态方法，包括生命周期，state，各种function，我们都可以得到
  注意： 如果在constructor里面重新定义了this.state会覆盖反向继承来的state，其他反向继承来的东西还没有验证
  */

/* const iiHoc = WrappedComponent => class extends WrappedComponent {
  constructor() {
    super();
    this.state = {
      b: this.state
    }
  }
  render() {
    console.log(this.state, 'state');
    //return super.render();
    return <WrappedComponent />
  }
}

export default iiHoc; */

/* 
第二种方式渲染劫持
这里HOC里定义的组件继承了WrappedComponent的render(渲染)，我们可以以此进行hijack(劫持)，也就是控制它的render函数
*/

/* const hijackRenderHoc = config => WrappedComponent => class extends WrappedComponent {
  render() {
    const { style = {} } = config;
    const elementsTree = super.render();
    console.log(elementsTree, 'elementsTree');
    if (config.type === 'add-style') {
      return <div style={{...style}}>
        {elementsTree}
      </div>;
    }
    return elementsTree;
  }
};

export default hijackRenderHoc; */


/* 
注意点(约束)

其实官网有很多，简单介绍一下。

第一点

最重要的原则就是，注意高阶组件不会修改子组件，也不拷贝子组件的行为。高阶组件只是通过组合的方式将子组件包装在容器组件中，是一个无副作用的纯函数

第二点

要给hoc添加class名，便于debugger。为了方便上面的好多栗子组件都没写class 名。当我们在chrome里应用React-Developer-Tools的时候，组件结构可以一目了然，所以DisplayName最好还是加上。
constructor

The most common technique is to wrap the display name of the wrapped component. So if your higher-order component is named withSubscription, and the wrapped component’s display name is CommentList, use the display name WithSubscription(CommentList):
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component { ... }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

第三点

静态方法要复制
无论PP还是II的方式，WrappedComponent的静态方法都不会复制，如果要用需要我们单独复制，其他详解见官网。
// Define a static method
WrappedComponent.staticMethod = function() {...}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true

第四点

refs不会传递。 意思就是HOC里指定的ref，并不会传递到子组件，如果你要使用最好写回调函数通过props传下去。

第五点

不要在render方法内部使用高阶组件。简单来说react的差分算法会去比较 NowElement === OldElement, 来决定要不要替换这个elementTree。也就是如果你每次返回的结果都不是一个引用，react以为发生了变化，去更替这个组件会导致之前组件的状态丢失。

 // HOC不要放到render函数里面
 
 class WrappedUsual extends Component {

  render() {
    const WrappenComponent = addStyle(addFunc(Usual));

    console.log(this.props, 'props');
    return (<div>
      <WrappedComponent />
    </div>);
  }
}

第六点

使用compose组合HOC。函数式编程的套路... 例如应用redux中的middleware以增强功能。redux-middleware解析

const addFuncHOC = ...
const addStyleHOC = ...//省略

const compose = (...funcs) => component => {
  if (funcs.lenght === 0) {
    return component;
  }
  const last = funcs[funcs.length - 1];
  return funcs.reduceRight((res, cur) => cur(res), last(component));
};

const WrappedComponent = compose(addFuncHOC, addStyleHOC)(Usual);

第七点

React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
connect是一个返回高阶组件的高阶函数！通过这个高阶组件返回的被包装组件能够连接到Redux store
*/