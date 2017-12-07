import React, {Component} from 'react';
import simpleHoc from './simpleHoc';
import {compose} from 'redux';

/* class Usual extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    }
  }
  componentWillMount() {
    console.log('usual componentWillMount');
  }
  componentDidMount() {
    console.log('usual componentDidMount');
  }
  render() {
    console.log(this.props, 'props');
    return (
      <div>
        Usual
      </div>
    )
  }
}

export default simpleHoc(Usual); */

/* 
下面的组件是配合高阶组件中属性代理的第三种方法，通过调用hoc的onchange方法实现受控组件
*/
/* class Login extends Component {
  render() {
    // 下面这种写法有点看不懂
    // console.log({...this.props.getField('username')});
    return (
      <div>
        <div>
          <label id="username">
            账户
          </label>
          <input name="username" {...this.props.getField('username')}/>
        </div>
        <div>
          <label id="password">
            密码
          </label>
          <input name="password" {...this.props.getField('password')}/>
        </div>
        <div onClick={this.props.handleSubmit}>提交</div>
        <div>other content</div>
      </div>
    )
  }
}

export default simpleHoc(Login); */

/* 
下面这个组件是配合hoc反向继承中的渲染劫持所写的组件
*/

/* class II extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        II
      </div>
    )
  }
}

export default simpleHoc({type: 'add-style', style: { color: 'red'}})(II) */

/* 
下面的组件是比较hoc和container的区别
container - 就是一般情况下我们会定义一个父组件调用子组件，目的是将props传给子组件
hoc的优点体现在HOC耦合性更低，灵活性更高，可以自由组合，更适合应付复杂的业务
*/

const addFunc = WrappedComponent => class extends Component {
  handleClick() {
    console.log('click');
  }
  
  render() {
    const props = {
      ...this.props,
      handleClick: this.handleClick,
    };
    return <WrappedComponent {...props} />;
  }
};

const addStyle = WrappedComponent => class extends Component {

  render() {
    return (<div style={{ color: 'yellow' }}>
      <WrappedComponent {...this.props} />
    </div>);
  }
};

// const WrappenComponent = addStyle(addFunc(Usual));

class WrappedUsual extends Component {

  render() {
    console.log(this.props, 'props');
    return (<div>
      hoc
    </div>);
  }
}
// The compose utility function is provided by many third-party libraries including lodash (as lodash.flowRight), Redux, and Ramda.
export default compose(addFunc, addStyle)(WrappedUsual);