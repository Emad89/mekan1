import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage'
import HomePage from "./containers/HomePage/HomePage";
import EmployeePage from "./containers/EmployeePage/EmployeePage";
import BookingPage from "./containers/BookingPage/BookingPage";
import AllBookingsPage from "./containers/AllBookingsPage/AllBookingsPage";
import BookingDetailsPage from "./containers/BookingDetailsPage/BookingDetailsPage";
import ServicePage from "./containers/ServicePage/ServicePage";

class App extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route path="/"  exact component={LoginPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/employee" component={EmployeePage}/>
                <Route path="/booking" component={BookingPage}/>
                <Route path="/allBookings" component={AllBookingsPage}/>
                <Route path="/bookingDetails" component={BookingDetailsPage}/>
                <Route path="/services" component={ServicePage}/>
            </Switch>
        </div>
    );
  }
}

export default App;
