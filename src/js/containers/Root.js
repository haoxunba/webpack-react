import React, { Component } from 'react';
import routes from '../routes';
import { Router } from 'react-router';
import {Provider} from 'react-redux';
// import '../../styles/normalize.scss'
// import '../../styles/app.scss'
// import '../../styles/antdStyleReset.scss'
// import '../../styles/font.scss'
// import '../../styles/animations.scss'
import '../../styles/antd-mobile.css'
// import 'antd-mobile/dist/antd-mobile.css'

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}
