import React , {Component} from 'react';
import Menu from '../../components/Menu/Menu';
import AllBookings from '../../components/AllBookings/AllBookings';
import Functions from '../../helper/Functions';
import BookingJson from '../../helper/bookingDetail.json';
import MenuPage from '../MenuPage/MenuPage';
import BaseConfig from "../../BaseConfig";


class AllBookingsPage extends Component{

    state = {
        bookings : '',
        openDeleteBookingModal : false,
        btnDisable : false,
        id : ''
    }

    componentDidMount = () => {
        this.getAllBookings();
    }

    getAllBookings = () => {
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = null;
        const get = Functions.ajaxFunction("booking/all",headers, body,'GET');
        get.then((data) => data.json())
            .then((data) => {
                    if(data != null){
                        this.setState({bookings : data});
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    onDeleteCloseModal = () => {
        this.setState({openDeleteBookingModal : false});
        this.getAllBookings();
    }

    deleteBooking = () => {
        this.setState({btnDisable : true});
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = {
            "id" : this.state.id
        }
        const post = Functions.ajaxFunction("booking/deleteBooking",headers, JSON.stringify(body),'DELETE');
        post.then((data) => data)
            .then((data) => {
                    this.setState({btnDisable : false});
                    if(data.status == "200"){
                        Functions.alertNotification("تم حذف معلومات العميل بنجاح", "error");
                        this.onDeleteCloseModal();
                    }
                    if(data.status === 400){
                        Functions.alertNotification("ليس لديك الصلاحيات لحذف الحجز", "error");
                        this.onDeleteCloseModal();
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )

    }

    openDeleteBookingModal = (id) => {
        this.setState({openDeleteBookingModal: true,id : id});
    }

    openEditBookingModal = (id,firstName,lastName,nationality,bookingState,whatsapp,email,arrivingCountry,
        arrivingAirport,flightNumber,arrivingDate,departureDate,serviceType,details,
        comments,price,paidAmount,remainPayment,adults,babies,children,phone,refNumber,currency,programDetails,servicesDetails) =>{
        let booking = new Object();
        booking.id = id;
        booking.firstName = firstName;
        booking.lastName = lastName;
        booking.nationality = nationality;
        booking.bookingState = bookingState;
        booking.bookingStatus = bookingState;
        booking.whatsapp = whatsapp;
        booking.email = email;
        booking.arrivingCountry = arrivingCountry;
        booking.arrivingAirport = arrivingAirport;
        booking.flightNumber = flightNumber;
        booking.arrivingDate = arrivingDate;
        booking.departureDate = departureDate;
        booking.serviceType = serviceType;
        booking.details = details;
        booking.comments = comments;
        booking.price = price;
        booking.paidAmount = paidAmount;
        booking.remainPayment = remainPayment;
        booking.adults = adults;
        booking.babies = babies;
        booking.children = children;
        booking.phone = phone;
        booking.refNumber = refNumber;
        booking.currency = currency;
        booking.isItUpdate = false;
        booking.programDetails = programDetails;
        booking.servicesDetails = servicesDetails;
        Functions.setCookies("booking",(JSON.stringify(booking)));
        window.location.href = BaseConfig.frontEndUrl + "booking";
    }

    render(){
        return(
            <div>
                <MenuPage/>
                <AllBookings
                    bookings = {this.state.bookings}
                    openDeleteBookingModalStatus = {this.state.openDeleteBookingModal}
                    openDeleteBookingModal = {this.openDeleteBookingModal}
                    openEditBookingModal = {this.openEditBookingModal}
                    onDeleteCloseModal = {this.onDeleteCloseModal}
                    btnDisable = {this.state.btnDisable}
                    deleteBooking = {this.deleteBooking}
                />
            </div>
        )
    }
}
export default AllBookingsPage;