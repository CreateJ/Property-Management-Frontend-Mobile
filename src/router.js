import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from '@/routes/index';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* exact 是路由全匹配的意思，如果不加，使用'/app' 会优先匹配到 '/' */}
        <Route path="/" component={IndexPage} location={history.location}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
