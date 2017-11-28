import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Home from './Home';
import App from './App';

let routes =
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    
  </Route>

export default routes