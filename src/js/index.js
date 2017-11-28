import {AppContainer} from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import {routes} from './containers/Root'
const rootEl = document.getElementById('app');

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>,
  rootEl
)


if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    )
  });
}