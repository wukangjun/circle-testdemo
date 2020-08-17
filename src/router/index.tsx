import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Manager = React.lazy(() => import('../pages/Manager'))
const Paint = React.lazy(() => import('../pages/Paint'))
const Mine = React.lazy(() => import('../pages/Mine'))

export default function RouterConfiguration() {
  return (
    <Suspense fallback="正在加载中...">
      <Switch>
        <Route path="/" exact={true} component={Manager} />
        <Route path="/paint" component={Paint} />
        <Route path="/mine" component={Mine} />
      </Switch>
    </Suspense>
  );
}






