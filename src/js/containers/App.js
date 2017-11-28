import React,{ Component } from 'react';
export default class App extends React.Component {
  render() {
    const { children } =this.props;
    return children
  }
}