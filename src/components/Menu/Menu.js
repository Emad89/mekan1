import React from 'react';
import classes from './Menu.css';
import Notifications, {notify} from 'react-notify-toast';
import baseConfig from '../../BaseConfig';
import Functions from '../../helper/Functions';
import logo from '../../img/logo_sticky.png';

const menu = (props) =>{

    let array = [];
    if(props.notifications){
        for(let i = 0; i < props.notifications.length; i++){
            const name = props.notifications[i].firstName + props.notifications[i].lastName;
            array.push(<li data-id={props.notifications[i].id}
                           data-firstname = {props.notifications[i].firstName}
                           data-lastname = {props.notifications[i].lastName}
                           data-nationality = {props.notifications[i].nationality}
                           data-bookingstatus = {props.notifications[i].bookingState}
                           data-whatsapp = {props.notifications[i].whatsapp}
                           data-email = {props.notifications[i].email}
                           data-arrivingcountry = {props.notifications[i].arrivingCountry}
                           data-arrivingairport = {props.notifications[i].arrivingAirport}
                           data-flightnumber = {props.notifications[i].flightNumber}
                           data-arrivingdate = {props.notifications[i].arrivingDate}
                           data-departuredate = {props.notifications[i].departureDate}
                           data-servicetype = {props.notifications[i].serviceType}
                           data-details = {props.notifications[i].details}
                           data-comments = {props.notifications[i].comments}
                           data-price = {props.notifications[i].price}
                           data-paidamount = {props.notifications[i].paidAmount}
                           // data-remainpayment = {props.notifications[i].remainPayment}
                           data-adults = {props.notifications[i].adults}
                           data-babies = {props.notifications[i].babies}
                           data-children = {props.notifications[i].children}
                           data-phone = {props.notifications[i].phone}
                           onClick={props.goToDetailPage} key={props.notifications[i].id}><a>{name}</a></li>);
        }
    }

    return(
        <div>
            <Notifications />
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a href={baseConfig.frontEndUrl+"employee"}>الموظفيين</a></li>
                        <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">الرحلات<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href={baseConfig.frontEndUrl+"booking"}>تسجيل حجز جديدة</a></li>
                                <li><a href={baseConfig.frontEndUrl+"allBookings"}>جميع الحجوزات</a></li>
                            </ul>
                        </li>
                        <li style={{marginTop:"10px",backgroundColor:"white"}}><img src={logo} alt="IMG"/></li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li><a href="#" onClick={props.logout}><i className="fas fa-sign-out-alt" aria-hidden="true" style={{paddingRight:"5px"}}></i>تسجيل الخروج</a></li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#" style={{padding:"0px"}}>
                                <i className="fas fa-user-clock"></i>
                                <span class="num">{props.notificationsNumber}</span>
                            </a>
                            <ul className="dropdown-menu" id="notificationContainer">
                                {array}
                            </ul>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    );


};
export default menu;