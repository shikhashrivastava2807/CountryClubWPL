import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'holderjs/holder'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import HomePage from "./Components/HomePage";
import ContactUs from "./Components/ContactUs";
// import StaticHeader from "./Components/StaticHeader";
import MembershipPlans from "./Components/MembershipPlans";
import AllActivities from "./Components/AllActivities";
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import UserFav from "./Components/UserFav";
import Navbars from "./Components/Navbars"
import {Locations} from "./Components/Locations";
import {LocationDetails} from "./Components/LocationDetails";



function App() {
  return (
    <Router>
        <div className="App">
            {/* <StaticHeader/> */}
            <Navbars />
            <Route path="/" component={HomePage} exact/>
            <Route path="/MembershipPlans" component={MembershipPlans} exact/>
            <Route path="/Activities" component={AllActivities} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/profile" component={Profile} exact/>
            <Route path="/Favorite" component={UserFav} exact/>
            <Route path="/Favorite" component={UserFav} exact/>
            <Route path="/Locations" component={Locations} exact/>
            <Route path="/Locations/details/:clubId" component={LocationDetails} />


        </div>
    </Router>
  );
}

export default App;
