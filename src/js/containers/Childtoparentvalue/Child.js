import React,{Component} from 'react';

export default class Child extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childValue: this.props.parentValue
    }
  }

  // componentWillMount() {
  //   this.setState({
  //     childValue: this.props.parentValue
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props.parentValue != nextProps.parentValue) {
      this.setState({
        childValue: nextProps.parentValues
      })
    }
  }

  handleChildChange() {

  }

  render() {
    return <input type="text" value={this.state.childValue} onChange={this.handleChildChange}/>
  }
}