import React,{ Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions/testAction';

class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
    this.props.actions.test('发送dispatch');
  }

  componentDidMount() {
    console.log(this.props.test);
  }

  render() {
    return (
      <div>这里是首页</div> 
    )
  }
}

function mapStateToprops(state) {
  return {
    test: state.homeReducers.testContent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Home)