import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
import PrivateRoute from "@/components/login/PrivateRoute";
const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgetPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/admin/login" component={Login} />
          <Route path="/admin/signup" component={SignUp} />
          <Route path="/admin/forgot-password" component={ForgetPassword} />
          <Route path="/admin/reset-password/:token" component={ResetPassword} />

          
          <PrivateRoute>
            {" "}
            <Route path="/" component={Layout} />
          </PrivateRoute>{" "}
          {/* <Route path="/" component={Layout} /> */}
          <Redirect exact from="/" to="/admin/login" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
