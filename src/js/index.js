import {AppContainer} from 'react-hot-loader'
import React from 'react'
import {render} from 'react-dom'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import Redbox from 'redbox-react'
const rootEl = document.getElementById('app');

render(
  <AppContainer errorReporter={Redbox}>
    <Root history={browserHistory} />
  </AppContainer>,
  rootEl
)


if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/Root').default;
    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp />
      </AppContainer>,
      rootEl
    )
  });
}