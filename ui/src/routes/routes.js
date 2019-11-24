import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from '../components/login/Login';
import UserProfile from '../components/userProfile/UserProfile';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import Register from '../components/register/Register';
import Dashboard from '../components/dashboard/Dashboard';
import TeamFeature from '../components/teamFeature/TeamFeature';
import EditProfile from '../components/editProfile/EditProfile';


const Routes = withRouter(({ props, location }) => (
  <div className="menuWrapper">
    <Route location={location} exact path="/login" component={Login} />
    <div className="mainContainer">
    <AuthenticatedRoutes location={location} exact path="/" component={Dashboard} />
    <Route location={location} exact path="/user" component={UserProfile} />
    <Route location={location} exact path="/register" component={Register} />
    <Route location={location} exact path="/teamFeature" component={TeamFeature} />
    <Route location={location} exact path="/editProfile" component={EditProfile} />
      </div>
  </div>
));

export default Routes;
