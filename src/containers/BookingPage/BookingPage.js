import React , {Component} from 'react';
import MenuPage from '../MenuPage/MenuPage';
import Booking from '../../components/Booking/Booking';
import Functions from '../../helper/Functions';
import BaseConfig from "../../BaseConfig";


class BookingPage extends Component{

    state = {
        id : '',
        firstName : '',
        lastName : '',
        nationality : '',
        phone : '',
        whatsapp : '',
        email : '',
        arrivingCountry : '',
        arrivingAirport : '',
        departureDate : new Date(),
        arrivingDate : new Date(),
        details : '',
        comments : '',
        price : '',
        paidAmount : '',
        remainPayment : '',
        adults : '',
        children : '',
        babies : '',
        bookingState : '',
        currency : '',
        currencySelectedOption : '',
        bookingStateSelectedOption : '',
        serviceType : '',
        serviceTypeSelectedOption : '',
        firstNameValid : true,
        lastNameValid : true,
        nationalityValid : true,
        bookingStateValid : true,
        addBookingFormValid : true,
        btnDisable : false,
        inputArray : [],
        isItNewBooking : true,
        isItUpdate : false,
    }

    componentDidMount = () => {
       let booking = Functions.getCookies("booking");
       Functions.removeCookies("booking");
       if(booking != null && booking != ""){
           const jsonObject = JSON.parse(booking);
           let bookingState = "";
           let bookingType = "";
           let currency = "";
           if(jsonObject.bookingState === 0 || jsonObject.bookingState === "0"){
               bookingState =  { value: 0, label: 'مؤكد' };
           }
           if(jsonObject.bookingState === 1 || jsonObject.bookingState === "1"){
               bookingState =  { value: 1, label: 'غير مؤكد' };
           }
           if(jsonObject.bookingState === 2 || jsonObject.bookingState === "2"){
               bookingState =  { value: 2, label: 'ملغي' };
           }
           if(jsonObject.serviceType === 0 || jsonObject.serviceType === "0"){
               bookingType =  { value: 0, label: 'حجز فندق' };
           }
           if(jsonObject.serviceType === 1 || jsonObject.serviceType === "1"){
               bookingType =  { value: 1, label: 'شقة فندقية' };
           }
           if(jsonObject.serviceType === 2 || jsonObject.serviceType === "2"){
               bookingType =  { value: 2, label: 'كوخ خشبي' };
           }
           if(jsonObject.serviceType === 3 || jsonObject.serviceType === "3"){
               bookingType =  { value: 3, label: 'سيارة صغيرة مع سائق' };
           }
           if(jsonObject.serviceType === 4 || jsonObject.serviceType === "4"){
               bookingType =  { value: 4, label: 'سيارة اقتصادية عائلية مع سائق' };
           }
           if(jsonObject.serviceType === 5 || jsonObject.serviceType === "5"){
               bookingType =  { value: 5, label: 'سيارة فاخرة عائلية مع سائق' };
           }
           if(jsonObject.serviceType === 6 || jsonObject.serviceType === "6"){
               bookingType =   { value: 6, label: 'سيارة اقتصادية عائلية مع سائق' };
           }
           if(jsonObject.serviceType === 7 || jsonObject.serviceType === "7"){
               bookingType =  { value: 7, label: 'باص 13 راكب' };
           }
           if(jsonObject.serviceType === 8 || jsonObject.serviceType === "8"){
               bookingType =  { value: 8, label: 'برنامج سياحي كامل' };
           }
           if(jsonObject.serviceType === 9 || jsonObject.serviceType === "9"){
               bookingType =  { value: 9, label: 'يخت خاص' };
           }
           if(jsonObject.serviceType === 10 || jsonObject.serviceType === "10"){
               bookingType =  { value: 10, label: 'سهرة عشاء بوسفور' };
           }

           if(jsonObject.currency === 0 || jsonObject.currency === "0"){
               currency =  { value: 0, label: 'الدولار الأمريكي' };
           }
           if(jsonObject.currency === 1 || jsonObject.currency === "1"){
               currency =  { value: 1, label: 'الليرة التركي' };
           }
           if(jsonObject.currency === 2 || jsonObject.currency === "2"){
               currency =  { value: 2, label: 'الريال السعودي' };
           }
           if(jsonObject.currency === 3 || jsonObject.currency === "3"){
               currency =  { value: 3, label: 'الريال القطري' };
           }
           if(jsonObject.currency === 4 || jsonObject.currency === "4"){
               currency =  { value: 4, label: 'الدينار الكويتي' };
           }
           if(jsonObject.currency === 5 || jsonObject.currency === "5"){
               currency =  { value: 5, label: 'اليورو' };
           }
           let aDate = new Date();
           if(jsonObject.arrivingDate != null && jsonObject.arrivingDate != undefined){
               aDate = new Date(jsonObject.arrivingDate.substring(0,10));
               aDate.setHours(jsonObject.arrivingDate.substring(11,13));
               aDate.setMinutes(jsonObject.arrivingDate.substring(14,16));
           }
           let dDate = new Date();
           if(jsonObject.departureDate != null && jsonObject.departureDate != undefined){
               dDate = new Date(jsonObject.departureDate.substring(0,10));
           }
           this.state.isItUpdate = jsonObject.isItUpdate;
           this.state.arrivingDate = aDate;
           this.state.departureDate = dDate;
           this.setState({isItNewBooking : false,firstName : jsonObject.firstName , lastName : jsonObject.lastName , nationality : jsonObject.nationality,
               bookingStateSelectedOption : bookingState , id :jsonObject.id , bookingState:jsonObject.bookingStatus, whatsapp:jsonObject.whatsapp,
               email:jsonObject.email, arrivingCountry:jsonObject.arrivingCountry, arrivingAirport:jsonObject.arrivingAirport,
               flightNumber:jsonObject.flightNumber, phone:jsonObject.phone, departureDate : dDate, arrivingDate : aDate,
               serviceType : jsonObject.serviceType,details : jsonObject.details, comments : jsonObject.comments,price : jsonObject.price,
               paidAmount : jsonObject.paidAmount,remainPayment : jsonObject.remainPayment,adults : jsonObject.adults,babies : jsonObject.babies,
               children : jsonObject.children,serviceTypeSelectedOption:bookingType,currencySelectedOption : currency,currency:jsonObject.currency});
       }
    }

    handleChange = (e) => {
        let data = new Object();
        data.id = e.target.id;
        data.value = e.target.value;
        this.setState({[data.id]: data.value});
        this.checkRequiredFields(data);
    }

    handlePrice = (event) => {
       this.setState({price : event.currentTarget.value},function () {
           if(this.state.price === "" || this.state.price === 0 || this.state.price === "0"){
               this.setState({remainPayment : ""});
           }
       });
    }

    handlePaidAmount = (event) => {
        this.setState({paidAmount : event.currentTarget.value},function () {
            if(this.state.price !== "" && this.state.price !== 0 && this.state.price !== "0"){
                const remainAmount = Number(this.state.price) - Number(this.state.paidAmount);
                this.setState({remainPayment : remainAmount});
            }
        });
    }

    arrivingDateHandler = (arrivingDate) =>{
        this.setState({ arrivingDate : arrivingDate});
    }

    departureDateHandler = (departureDate) => {
        this.setState({ departureDate : departureDate});
    }

    checkRequiredFields = (data) => {
        if(data.id === "lastName" || data.id === "firstName" || data.id === "nationality"){
            const array = Functions.createInputArray(data,this.state.inputArray);
            this.setState({inputArray : array});
            const validationArray = Functions.validateFunction(this.state.inputArray);
            if(!validationArray){
                this.setState({addBookingFormValid : false});
            }
            else{
                for(var i=0 ; i<validationArray.length; i++){
                    const valid = [validationArray[i].id] + "Valid";
                    this.setState({[valid] : validationArray[i].isItValid});
                }
            }
        }
    }

    addBooking = () => {
        let aMonth = this.state.arrivingDate.getMonth();
        let aDay = this.state.arrivingDate.getDate();
        let aHours = this.state.arrivingDate.getHours();
        let aMinutes = this.state.arrivingDate.getMinutes();
        if(aMonth.toString().length === 1){
            aMonth = ("0" + (aMonth + 1)).slice(-2);
        }
        if(aDay.toString().length === 1){
            aDay = ("0" + (aDay)).slice(-2);
        }
        if(aHours.toString().length === 1){
            aHours = ("0" + (aHours)).slice(-2);
        }
        if(aMinutes.toString().length === 1){
            aMinutes = ("0" + (aMinutes)).slice(-2);
        }
        let dMonth = this.state.departureDate.getMonth();
        let dDay = this.state.departureDate.getDate();
        let dHours = this.state.departureDate.getHours();
        let dMinutes = this.state.departureDate.getMinutes();
        if(dMonth.toString().length === 1){
            dMonth = ("0" + (dMonth + 1)).slice(-2);
        }
        if(dDay.toString().length === 1){
            dDay = ("0" + (dDay)).slice(-2);
        }
        if(dHours.toString().length === 1){
            dHours = ("0" + (dHours)).slice(-2);
        }
        if(dMinutes.toString().length === 1){
            dMinutes = ("0" + (dMinutes)).slice(-2);
        }
        var aDate =  [this.state.arrivingDate.getFullYear(), aMonth,aDay, aHours, aMinutes].join('-');
        var sDate =  [this.state.departureDate.getFullYear(), dMonth,dDay, dHours, dMinutes].join('-');
        const body = {
            "firstName" : this.state.firstName,
            "lastName" : this.state.lastName,
            "nationality" : this.state.nationality,
            "bookingState" : this.state.bookingState,
            "arrivingAirport" : this.state.arrivingAirport,
            "arrivingCountry" : this.state.arrivingCountry,
            "arrivingDate" : aDate,
            "comments" : this.state.comments,
            "currency" : this.state.currency,
            "departureDate" : sDate,
            "details" : this.state.details,
            "paidAmount" : this.state.paidAmount,
            "remainPayment" : this.state.remainPayment,
            "phone" : this.state.phone,
            "email" : this.state.email,
            "price" : this.state.price,
            "serviceType" : this.state.serviceType,
            "whatsapp" : this.state.whatsapp,
            "adults" : this.state.adults,
            "babies" : this.state.babies,
            "children" : this.state.children,
            "flightNumber" : this.state.flightNumber
        }
        let url = "";
        let method = "";
        if(this.state.isItNewBooking === false){
            for(var i=0 ; i<3 ; i++){
                let data = new Object();
                if(i === 0){
                    data.id = "lastName";
                    data.value = this.state.lastName;
                }
                if(i === 1){
                    data.id = "firstName";
                    data.value = this.state.firstName;
                }
                if(i === 2){
                    data.id = "nationality";
                    data.value = this.state.nationality;
                }
                this.checkRequiredFields(data);
            }
            url =  "booking/updateBooking";
            method = "PUT";
            body.id = this.state.id;
        }
        else{
            url = "booking/createBooking";
            method = "POST";
        }
        let array = Functions.validateFunction(this.state.inputArray);
        const isItValid = Functions.checkFalseElements(array,3);
        if(isItValid == true){
            this.setState({addBookingFormValid : false});
        }
        else{
            this.setState({addBookingFormValid : true, btnDisable : true});
            console.log(body);
            // sDate = [sDate.getFullYear(), ("0" + (sDate.getMonth() + 1)).slice(-2),("0" + (sDate.getDate())).slice(-2)].join('-')+' '+
            //     [("0" + (sDate.getHours())).slice(-2), ("0" + (sDate.getMinutes())).slice(-2), ("0" + (sDate.getSeconds())).slice(-2)].join(':');
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            body
            const post = Functions.ajaxFunction(url,headers, JSON.stringify(body),method);
            console.log(method , url);
            post.then((data) => data.json())
                .then((data) => {
                        this.setState({btnDisable : false});
                        if(data != null){
                            Functions.alertNotification("تم اضافة معلومات الحجز بنجاح", "success");
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                    }
                )
        }
    }


    bookingStateChangeHandler = (bookingStateSelectedOption) => {
        let bookingState = "";
        if(bookingStateSelectedOption != null){
            bookingState = bookingStateSelectedOption.value;
        }
        this.setState({ bookingStateSelectedOption , bookingState : bookingState },function () {
             this.bookingStateValidateHandler();
        })
    }

    bookingStateValidateHandler = () => {
        if (this.state.bookingState === "" || this.state.bookingState === undefined || this.state.bookingState === null){
            this.setState({bookingStateValid : false})
        }
        else{
            this.setState({bookingStateValid : true})
        }
    }

    serviceTypeChangeHandler = (serviceTypeSelectedOption) => {
        if(serviceTypeSelectedOption !== undefined && serviceTypeSelectedOption !== null){
            this.setState({ serviceTypeSelectedOption , serviceType : serviceTypeSelectedOption.value },function () {})
        }
    }

    currencyChangeHandler = (currencySelectedOption) => {
        if(currencySelectedOption !== undefined && currencySelectedOption !== null){
            this.setState({ currencySelectedOption , currency : currencySelectedOption.value },function () {})
        }
    }

    render(){
        return(
            <div>
                <MenuPage/>
                <Booking
                    handleChange = {this.handleChange}
                    handlePrice = {this.handlePrice}
                    handlePaidAmount = {this.handlePaidAmount}

                    bookingStateChangeHandler = {this.bookingStateChangeHandler}
                    bookingStateSelectedOption = {this.state.bookingStateSelectedOption}

                    serviceTypeSelectedOption = {this.state.serviceTypeSelectedOption}
                    serviceTypeChangeHandler = {this.serviceTypeChangeHandler}

                    currencySelectedOption = {this.state.currencySelectedOption}
                    currencyChangeHandler = {this.currencyChangeHandler}

                    addBookingFormValid = {this.state.addBookingFormValid}

                    addBooking = {this.addBooking}
                    lastNameValid = {this.state.lastNameValid}
                    firstNameValid = {this.state.firstNameValid}
                    nationalityValid = {this.state.nationalityValid}
                    bookingStateValid = {this.state.bookingStateValid}

                    btnDisable = {this.state.btnDisable}

                    arrivingDateHandler = {this.arrivingDateHandler}
                    arrivingDate = {this.state.arrivingDate}

                    departureDateHandler = {this.departureDateHandler}
                    departureDate = {this.state.departureDate}

                    firstName = {this.state.firstName}
                    lastName = {this.state.lastName}
                    nationality = {this.state.nationality}
                    whatsapp = {this.state.whatsapp}
                    email = {this.state.email}
                    arrivingCountry = {this.state.arrivingCountry}
                    arrivingAirport = {this.state.arrivingAirport}
                    flightNumber = {this.state.flightNumber}
                    serviceType = {this.state.serviceType}
                    currency = {this.state.currency}
                    details = {this.state.details}
                    comments = {this.state.comments}
                    price = {this.state.price}
                    paidAmount = {this.state.paidAmount}
                    remainPayment = {this.state.remainPayment}
                    adults = {this.state.adults}
                    babies = {this.state.babies}
                    children = {this.state.children}
                    phone = {this.state.phone}

                    isItUpdate = {this.state.isItUpdate}
                />
            </div>
        )
    }
}
export default BookingPage;