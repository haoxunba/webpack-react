import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Child from './Child';

export default class Parent extends React.Component {

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this.child))
  }

  render() {
    return <Child ref={(child)=>{this.child=child}}/>
    // return <div ref={(div)=>{this.test=div}}>124</div>
  }
}