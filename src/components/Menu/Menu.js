import React from 'react';
import classes from './Menu.css';
import Notifications, {notify} from 'react-notify-toast';
import baseConfig from '../../BaseConfig';
import Functions from '../../helper/Functions';
import logo from '../../img/logo_sticky.png';

const menu = (props) =>{
    const role = Functions.getCookies("role");
    let array = [];
    if(props.notifications){
        for(let i = 0; i < props.notifications.length; i++){
            let flightNumber = "";
            let whatsapp = "";
            let arrivingCountry = "";
            let arrivingAirport = "";
            let serviceType = "";
            let email = "";
            let details = "";
            let comments = "";
            let babies = 0;
            let adults = 0;
            let children = 0;
            let paidAmount = "";
            let price = "";
            let phone = "";
            let remainPayment = "";
            let refNumber = "";
            let currency = "";
            let programDetails = "";
            let servicesDetails = "";
            const name = props.notifications[i].firstName + " - " + props.notifications[i].lastName;
            if(props.notifications[i].flightNumber != null && props.notifications[i].flightNumber != undefined){
                flightNumber = props.notifications[i].flightNumber;
            }
            if(props.notifications[i].adults != null && props.notifications[i].adults != undefined){
                adults = props.notifications[i].adults;
            }
            if(props.notifications[i].babies != null && props.notifications[i].babies != undefined){
                babies = props.notifications[i].babies;
            }
            if(props.notifications[i].children != null && props.notifications[i].children != undefined){
                children = props.notifications[i].children;
            }
            if(props.notifications[i].whatsapp != null && props.notifications[i].whatsapp != undefined){
                whatsapp = props.notifications[i].whatsapp;
            }
            if(props.notifications[i].email != null && props.notifications[i].email != undefined){
                email = props.notifications[i].whatsapp;
            }
            if(props.notifications[i].arrivingCountry != null && props.notifications[i].arrivingCountry != undefined){
                arrivingCountry = props.notifications[i].arrivingCountry;
            }
            if(props.notifications[i].arrivingAirport != null && props.notifications[i].arrivingAirport != undefined){
                arrivingAirport = props.notifications[i].arrivingAirport;
            }
            if(props.notifications[i].serviceType != null && props.notifications[i].serviceType != undefined){
                serviceType = props.notifications[i].serviceType;
            }
            if(props.notifications[i].details != null && props.notifications[i].details != undefined){
                details = props.notifications[i].details;
            }
            if(props.notifications[i].comments != null && props.notifications[i].comments != undefined){
                comments = props.notifications[i].comments;
            }
            if(props.notifications[i].price != null && props.notifications[i].price != undefined){
                price = props.notifications[i].price;
            }
            if(props.notifications[i].paidAmount != null && props.notifications[i].paidAmount != undefined){
                paidAmount = props.notifications[i].paidAmount;
            }
            if(props.notifications[i].phone != null && props.notifications[i].phone != undefined){
                phone = props.notifications[i].phone;
            }
            if(props.notifications[i].remainPayment != null && props.notifications[i].remainPayment != undefined){
                remainPayment = props.notifications[i].remainPayment;
            }
            if(props.notifications[i].refNumber != null && props.notifications[i].refNumber != undefined){
                refNumber = props.notifications[i].refNumber;
            }
            if(props.notifications[i].currency != null && props.notifications[i].currency != undefined){
                currency = props.notifications[i].currency;
            }
            if(props.notifications[i].programDetails != null && props.notifications[i].programDetails != undefined){
                programDetails = JSON.stringify(props.notifications[i].programDetails);
            }
            if(props.notifications[i].servicesDetails != null && props.notifications[i].servicesDetails != undefined){
                servicesDetails = JSON.stringify(props.notifications[i].servicesDetails);
            }
            array.push(<li data-id={props.notifications[i].id}
                           data-firstname = {props.notifications[i].firstName}
                           data-lastname = {props.notifications[i].lastName}
                           data-nationality = {props.notifications[i].nationality}
                           data-bookingstatus = {props.notifications[i].bookingState}
                           data-whatsapp = {whatsapp}
                           data-refNumber = {refNumber}
                           data-email = {email}
                           data-arrivingcountry = {arrivingCountry}
                           data-arrivingairport = {arrivingAirport}
                           data-flightnumber = {flightNumber}
                           data-arrivingdate = {props.notifications[i].arrivingDate}
                           data-departuredate = {props.notifications[i].departureDate}
                           data-servicetype = {serviceType}
                           data-details = {details}
                           data-comments = {comments}
                           data-price = {price}
                           data-paidamount = {paidAmount}
                           data-remainpayment = {remainPayment}
                           data-adults = {adults}
                           data-babies = {babies}
                           data-children = {children}
                           data-phone = {phone}
                           data-currency = {currency}
                           data-programDetails = {programDetails}
                           data-servicesDetails = {servicesDetails}
                           onClick={props.goToDetailPage} key={props.notifications[i].id}><a>{name}</a></li>);
        }
    }

    return(
        <div>
            <Notifications />
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                        {role}
                        {role === "ADMIN" ?
                            <li className="active"><a href={baseConfig.frontEndUrl+"services"}>الخدمات</a></li> : ''
                        }
                        {role === "ADMIN" ?
                            <li className="active"><a href={baseConfig.frontEndUrl+"employee"}>الموظفيين</a></li> : ''
                        }
                        <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">الرحلات<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href={baseConfig.frontEndUrl+"booking"}>تسجيل حجز جديد</a></li>
                                <li><a href={baseConfig.frontEndUrl+"allBookings"}>جميع الحجوزات</a></li>
                            </ul>
                        </li>
                        <li style={{marginTop:"10px",backgroundColor:"white"}}>
                            <a style={{padding:"0px"}} href={baseConfig.frontEndUrl+"home"}>
                                <img src={logo} alt="IMG"/>
                            </a>
                        </li>
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