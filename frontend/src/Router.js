import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import PNF from './pages/404';
import { checkLogin, checkRole, selectedProject } from './auth';
import Signup from './pages/auth/Signup';
import Setting from './pages/dashboard/Setting';
import OrdersList from './pages/dashboard/OrdersList';
import ChangePassword from './pages/auth/ChangePassword';
import AccountSuspended from './pages/dashboard/AccountSuspended';
import UserProfile from './pages/dashboard/UserProfile';
import CustomerSupport from './pages/dashboard/CustomerSupport';
import OrderDetails from './pages/dashboard/OrderDetails';
import TwoStepVerification from './pages/auth/TwoStepVerification';
import SelectProject from './pages/auth/SelectProject';

console.log(selectedProject(), "selectedProject()");
const Router = () => {
  return (
    <Routes>
      {/* auth-routes */}
      <Route
        exact
        path='/select-project'
        element={checkLogin() && !selectedProject() ? <SelectProject /> : <Navigate to='/dashboard' replace={true} />}
      />
      <Route
        exact
        path='/'
        element={!checkLogin() ? <Login /> : <Navigate to='/dashboard' replace={true} />}
      />
      <Route
        exact
        path='/signup'
        element={!checkLogin() ? <Signup /> : <Navigate to='/' />}
      />
      <Route
        exact
        path='/resetpassword'
        element={!checkLogin() ? <ResetPassword /> : <Navigate to='/' />}
      />
      <Route
        exact
        path='/changepassword'
        element={!checkLogin() ? <ChangePassword /> : <Navigate to='/' />}
      />
      <Route path="/userverification/:userToken"
        element={!checkLogin() ? <TwoStepVerification /> : <Navigate to='/' />}
      />

      {/* dashboard routes */}

      <Route
        exact
        path='/dashboard'
        element={checkLogin() && selectedProject() ? <Dashboard /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />

      <Route
        exact
        path='/orderslist'
        element={checkLogin() && selectedProject() ? <OrdersList /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route
        exact
        path='/setting'
        element={checkLogin() && checkRole() && selectedProject() ? <Setting /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route
        exact
        path='/wildarts-setting'
        element={checkLogin() && checkRole() && selectedProject() ? <Setting /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route path="/order/:orderId"
        element={checkLogin() && selectedProject() ? <OrderDetails /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route path="/accountsuspended"
        element={!checkLogin() && selectedProject() ? <AccountSuspended /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route path="/userprofile"
        element={checkLogin() && selectedProject() ? <UserProfile /> : (checkLogin() && !selectedProject() ? <Navigate to="/select-project"/> : <Navigate to='/' />)}
      />
      <Route path="/customersupport"
        element={<CustomerSupport />}
      />
      <Route path='*' element={<PNF />} />
    </Routes>
  );
};

export default Router;
