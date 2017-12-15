/* 
功能： 子组件和父组件的输入框值同步
知识点： 父子组件间传值
*/

import React,{Component} from 'react';
import Child from './Child.js';

export default class Parent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      parentValue: ''
    };
  }

  handleParentChange(e) {
    this.setState({
      parentValue: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.parentValue} onChange={(e)=>this.handleParentChange(e)}/>
        <Child parentValue={this.state.parentValue}/>
      </div>
    )
  }
}