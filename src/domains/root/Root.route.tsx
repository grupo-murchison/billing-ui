import { Routes, Route, Navigate } from 'react-router-dom';

import RootLayout from './Root';

const RootRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}></Route>
    </Routes>
  );
};

export default RootRoute;


export const RootRouteRedirect = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}></Route>
    </Routes>
  );
};