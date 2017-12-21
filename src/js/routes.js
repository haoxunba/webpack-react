import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App';
import Home from './containers/Home';
import Hoc from './containers/Hoc';
import Parent from './containers/Refs/Parent';
import Childtoparent from './containers/Childtoparentvalue/Parent'; 
import AntdStyleReset from './containers/AntdsStyleReset/AntdStyleReset';
import CssModules from './containers/CssModules/CssModules';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="hoc" component={Hoc}/>
    <Route path='refs' component={Parent}/>
    <Route path='childtoparent' component={Childtoparent} />
    <Route path='antdStyleReset' component={AntdStyleReset}/>
    <Route path='cssModules' component={CssModules}/>
  </Route>
);