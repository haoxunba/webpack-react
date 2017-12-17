import React,{Component} from 'react';

export default class Child extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childValue: ''
    };
  }

  
  componentWillReceiveProps(nextProps) {
    if(this.props.parentValue != nextProps.parentValue) {
      this.setState({
        childValue: nextProps.parentValue
      })
      
    }
  }

  handleChildChange(e) {
    this.setState({
      childValue: e.target.value
    },()=>{
      this.props.parentChange(e.target.value);
    })
  }


  render() {
    return (
      <div>
        <input type="text" value={this.state.childValue || ''} onChange={(e)=>this.handleChildChange(e)}/>
      </div>
    )
  }
}