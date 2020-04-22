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
import StaticHeader from "./Components/StaticHeader";
import MembershipPlans from "./Components/MembershipPlans";
import AllActivities from "./Components/AllActivities";


function App() {
  return (
    <Router>
        <div className="App">
            <StaticHeader/>
            <Route path="/" component={HomePage} exact/>
            <Route path="/MembershipPlans" component={MembershipPlans} exact/>
            <Route path="/Activities" component={AllActivities} exact/>
            
        </div>
    </Router>
  );
}

export default App;
