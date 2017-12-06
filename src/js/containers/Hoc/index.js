import React, {Component} from 'react';
import simpleHoc from './simpleHoc';

class Usual extends React.Component{
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

export default simpleHoc(Usual);