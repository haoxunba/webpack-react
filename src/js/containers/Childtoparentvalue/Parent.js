
import React,{Component} from 'react';
import Child from './Child.js';

export default class Parent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      parentValue: ''
    };
  }

  handleParentChange(arg, event) {
    this.setState({
      parentValue: arg || event.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.parentValue} onChange={this.handleParentChange.bind(this, '')}/>
        <Child parentValue={this.state.parentValue} parentChange={(p)=>this.handleParentChange(p)}/>
      </div>
    )
  }
}