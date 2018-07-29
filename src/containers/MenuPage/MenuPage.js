import React,{Component} from 'react';
import Menu from '../../components/Menu/Menu';
import Functions from '../../helper/Functions';
import BookingJson from '../../helper/bookingDetail.json'
import { Redirect } from 'react-router-dom'
import BaseConfig from '../../BaseConfig';
import {Route,Switch} from 'react-router-dom';
import AllBookingsPage from "../AllBookingsPage/AllBookingsPage";
import BookingPage from "../BookingPage/BookingPage";

class MenuPage extends Component{
    state = {
        notificationNumber : 0,
        notifications : '',
        showNotificationDetails : false
    }

    componentDidMount = () => {
        const token = Functions.getCookies("token");
        if(token === null || token === undefined || token === ""){
            window.location.href = BaseConfig.frontEndUrl;
        }
        this.getNotifications();
    }

    getNotifications2 = () => {
        this.interval = setInterval(() => {
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = null;
            const get = Functions.ajaxFunction("booking/tomorrowsBooking",headers, body,'GET');
            get.then((data) => data.json())
                .then((data) => {
                        if(data != null){
                            this.setState({notificationNumber : data.length,notifications : data});
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                    }
                )
        }, 3000);
    }

    getNotifications = () => {
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = null;
            const get = Functions.ajaxFunction("booking/tomorrowsBooking",headers, body,'GET');
            get.then((data) => data.json())
                .then((data) => {
                        if(data != null){
                            this.setState({notificationNumber : data.length,notifications : data});
                            this.getNotifications2()
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                    }
                )

    }

    goToDetailPage = (e) => {
        let booking = new Object();
        booking.id = e.currentTarget.attributes["data-id"].value;
        booking.firstName = e.currentTarget.attributes["data-firstname"].value;
        booking.refNumber = e.currentTarget.attributes["data-refNumber"].value;
        booking.lastName = e.currentTarget.attributes["data-lastname"].value;
        booking.nationality = e.currentTarget.attributes["data-nationality"].value;
        booking.bookingState = e.currentTarget.attributes["data-bookingstatus"].value;
        booking.whatsapp = e.currentTarget.attributes["data-whatsapp"].value;
        booking.email = e.currentTarget.attributes["data-email"].value;
        booking.arrivingCountry = e.currentTarget.attributes["data-arrivingcountry"].value;
        booking.arrivingAirport = e.currentTarget.attributes["data-arrivingairport"].value;
        booking.flightNumber = e.currentTarget.attributes["data-flightnumber"].value;
        booking.arrivingDate = e.currentTarget.attributes["data-arrivingdate"].value;
        booking.departureDate = e.currentTarget.attributes["data-departuredate"].value;
        booking.serviceType = e.currentTarget.attributes["data-servicetype"].value;
        booking.details = e.currentTarget.attributes["data-details"].value;
        booking.comments = e.currentTarget.attributes["data-comments"].value;
        booking.price = e.currentTarget.attributes["data-price"].value;
        booking.paidAmount = e.currentTarget.attributes["data-paidamount"].value;
        booking.remainPayment = e.currentTarget.attributes["data-remainpayment"].value;
        booking.adults = e.currentTarget.attributes["data-adults"].value;
        booking.babies = e.currentTarget.attributes["data-babies"].value;
        booking.children = e.currentTarget.attributes["data-children"].value;
        booking.phone = e.currentTarget.attributes["data-phone"].value;
        booking.currency = e.currentTarget.attributes["data-currency"].value;
        booking.isItUpdate = true;
        Functions.setCookies("booking",(JSON.stringify(booking)));
        window.location.href = BaseConfig.frontEndUrl + "booking";
    }

    logout = () =>{
        Functions.removeCookies("token");
        Functions.removeCookies("role");
        window.location.href = BaseConfig.frontEndUrl;
    }

    render()
    {
        return(
            <div>
                <Menu
                    notificationsNumber = {this.state.notificationNumber}
                    notifications = {this.state.notifications}
                    goToDetailPage = {this.goToDetailPage}
                    logout = {this.logout}
                />
            </div>
        )
    }

}


export default MenuPage;