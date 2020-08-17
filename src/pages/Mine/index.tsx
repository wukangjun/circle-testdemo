import React from 'react'
// import { Switch, Route } from 'react-router-dom';
// const MineDesc = React.lazy(() => import('../MineDesc'))
// const MineInfo = React.lazy(() => import('../MineInfo'))
// function MineRouteChildren() {
//   return (
//     <Suspense fallback="正在加载中...">
//       <Switch>
//         <Route path="/mine/desc" component={MineDesc} />
//         <Route path="/mine/desc" component={MineInfo} />
//       </Switch>
//     </Suspense>
//   );
// }
/**
 * @route-path: /mine
 * @route-children: [/mine/desc, /mine/info]
 */
export default function Mine() {
  return (
    <div>
      <h2>welcome mine page</h2>
      {/* route-children */}
    </div>
  );
}

