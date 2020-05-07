import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'holderjs/holder'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import HomePage from "./Components/HomePage";
import MembershipPlans from "./Components/MembershipPlans";
import AllAmenities from "./Components/AllAmenities";
import Login from './Components/LoginRegistration/Login'
import Register from './Components/LoginRegistration/Register'
import Profile from './Components/LoginRegistration/Profile'
import UserFav from "./Components/UserFav";
import Navbars from "./Components/Navbars"
import UserDetails from "./Components/LoginRegistration/UserDetails"
import {Locations} from "./Components/ClubLocations/Locations";
import {LocationDetails} from "./Components/ClubLocations/LocationDetails";

function App() {
  return (
    <Router>
        <div className="App">
            <Navbars />
            <Route path="/" component={HomePage} exact/>
            <Route path="/MembershipPlans" component={MembershipPlans} exact/>
            <Route path="/Amenities/:clubId" component={AllAmenities} exact/>
            <Route path="/Amenities" component={AllAmenities} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/profile" component={Profile} exact/>
            <Route path="/Favorite" component={UserFav} exact/>
            <Route path="/UserDetails" component={UserDetails} exact/>
            <Route path="/Locations" component={Locations} exact/>
            <Route path="/Locations/:clubId" component={LocationDetails} />
        </div>
    </Router>
  );
}

export default App;
