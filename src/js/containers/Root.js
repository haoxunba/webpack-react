import React, { Component } from 'react';
import routes from '../routes';
import { Router } from 'react-router';
import {Provider} from 'react-redux';
import '../../styles/normalize.css'; // normalize是github包文件https://github.com/necolas/normalize.css/blob/master/normalize.css
// import '../../styles/app.scss'

// import '../../styles/font.scss'
// import '../../styles/animations.scss'
// import '../../styles/antd-mobile.css' 由于配置了babel-plugin-import，antd的样式会从包文件中匹配
import '../../styles/antdStyleReset.scss';
import '../../styles/common.scss';

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
