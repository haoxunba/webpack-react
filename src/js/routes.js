import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App';
import Home from './containers/Home';
import Coupon from './containers/Coupon';
import CouponDetail from './containers/Coupon/Detail';
import Shop from './containers/Shop';
import ShopDetail from './containers/Shop/Detail';
import Tour from './containers/Tour';
import User from './containers/User';
import NotFoundPage from './containers/404';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="coupon">
      <IndexRoute component={Coupon}/>
      <Route path=":id" component={CouponDetail}/>
    </Route>
    <Route path="shop">
      <IndexRoute component={Shop}/>
      <Route path=":id" component={ShopDetail}/>
    </Route>
    <Route path="tour" component={Tour}/>
    <Route path="user" component={User}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);