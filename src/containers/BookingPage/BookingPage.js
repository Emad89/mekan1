import React , {Component} from 'react';
import MenuPage from '../MenuPage/MenuPage';
import Booking from '../../components/Booking/Booking';
import Functions from '../../helper/Functions';
import BaseConfig from "../../BaseConfig";
import Select from 'react-select';
// import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
        departureDate : new moment(),
        arrivingDate : new moment(),
        details : '',
        comments : '',
        price : '',
        paidAmount : '',
        remainPayment : '',
        servicesType : [],
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
        removeSelectedService : false,
        serviceInfo: [
            {serviceStartDate: "", serviceEndDate: "",selectedServiceOption:'', city: '',selectedBreakfast:'', comments: '',
            start: '', rooms: '' , breakfast:'' , car:'' , selectedService : '', selectedServiceCode:'',showCarType : false,
            showHotel : false,sDate : new moment(),eDate: new moment(),service_type_id : '',
            selectedType : ""}
            ],
        colorSelectedOption: '',
        variances: [{Color: '', Size: '', Quantity: '', SalePrice: 0, PurchasePrice: 0, Barcode: '' , ColorCode:'' , depotId:'' , SizeCode : ''}],
        numberOfDays : 0,
        showProgramDetails : false,
        programInfo : [{programDetails : '', programIndex : ''}],
        services : '',

    }


    getAllservices = (jsonObject) => {
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = null;
        const get = Functions.ajaxFunction("serviceType/all",headers, body,'GET');
        get.then((data) => data.json())
            .then((data) => {
                    if(data != null){
                        this.setState({services : data},function () {
                            let bookingType = "";
                            let serviceType = "";
                            if(jsonObject){
                                for(var sI = 0 ; sI < this.state.serviceInfo.length ; sI++){
                                    let curService = jsonObject.servicesDetails[sI];
                                    for(var ss=0;ss<this.state.services.length;ss++){
                                        if(curService !== undefined){
                                            if(Number(curService.selectedType) === this.state.services[ss].id){
                                                serviceType =  { value: this.state.services[ss].id, label: this.state.services[ss].serviceType, type :this.state.services[ss].type  };
                                                this.state.serviceInfo[sI].selectedServiceOption = serviceType;
                                                this.state.serviceInfo[sI].selectedType = serviceType.value;
                                                let varShowHotel = "";
                                                let varShowCarType = "";
                                                if(this.state.services[ss].type === 0){
                                                    varShowHotel = true;
                                                    this.state.serviceInfo[sI].rooms = curService.rooms;
                                                    this.state.serviceInfo[sI].start = curService.start;
                                                    this.state.serviceInfo[sI].breakfast = curService.breakfast;
                                                    let b;
                                                    if(this.state.serviceInfo[sI].breakfast === true){
                                                        b = {value: 1, label: 'مع افطار'};
                                                    }
                                                    else if(this.state.serviceInfo[sI].breakfast === false){
                                                        b = {value: 0, label: 'بدون افطار'};
                                                    }
                                                    this.state.serviceInfo[sI].selectedBreakfast = b;
                                                }
                                                else{
                                                    varShowHotel = false;
                                                }
                                                if(this.state.services[ss].type === 1){
                                                    varShowCarType = true;
                                                    this.state.serviceInfo[sI].car = curService.car;
                                                }
                                                else{
                                                    varShowCarType = false;
                                                }
                                                this.state.serviceInfo[sI].showHotel = varShowHotel;
                                                this.state.serviceInfo[sI].showCarType = varShowCarType;
                                            }
                                        }
                                    }
                                }
                                let xx = this.state.serviceInfo;
                                for(var s=0;s<this.state.services.length;s++){
                                    if(Number(jsonObject.serviceType) === this.state.services[s].id){
                                        bookingType =  { value: this.state.services[s].id, label: this.state.services[s].serviceType, type :this.state.services[s].type  };
                                        this.setState({serviceTypeSelectedOption:bookingType},function () {
                                        })
                                    }
                                }
                            }
                        });
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }


    componentWillMount=()=>{
        let booking = Functions.getCookies("booking");
        Functions.removeCookies("booking");
        if(booking != null && booking != ""){
            const jsonObject = JSON.parse(booking);
            this.getAllservices(jsonObject);
            let bookingState = "";
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
            let aDate = new moment();
            if(jsonObject.arrivingDate != null && jsonObject.arrivingDate != undefined){
                aDate = new moment(jsonObject.arrivingDate.substring(0,10));
                aDate._d.setHours(jsonObject.arrivingDate.substring(11,13));
                aDate._d.setMinutes(jsonObject.arrivingDate.substring(14,16));
            }
            let dDate = new moment();
            if(jsonObject.departureDate != null && jsonObject.departureDate != undefined){
                dDate = new moment(jsonObject.departureDate.substring(0,10));
                dDate._d.setHours(jsonObject.departureDate.substring(11,13));
                dDate._d.setMinutes(jsonObject.departureDate.substring(14,16));
            }
            this.state.isItUpdate = jsonObject.isItUpdate;
            this.state.arrivingDate = aDate._d;
            this.state.departureDate = dDate._d;
            this.setState({isItNewBooking : false,firstName : jsonObject.firstName , lastName : jsonObject.lastName , nationality : jsonObject.nationality,
                bookingStateSelectedOption : bookingState , id :jsonObject.id , bookingState:jsonObject.bookingStatus, whatsapp:jsonObject.whatsapp,
                email:jsonObject.email, arrivingCountry:jsonObject.arrivingCountry, arrivingAirport:jsonObject.arrivingAirport,
                flightNumber:jsonObject.flightNumber, phone:jsonObject.phone, departureDate : dDate, arrivingDate : aDate,
                serviceType : jsonObject.serviceType,details : jsonObject.details, comments : jsonObject.comments,price : jsonObject.price,
                paidAmount : jsonObject.paidAmount,remainPayment : jsonObject.remainPayment,adults : jsonObject.adults,babies : jsonObject.babies,
                children : jsonObject.children,currencySelectedOption : currency,currency:jsonObject.currency,serviceInfo : jsonObject.servicesDetails});

            let details = jsonObject.programDetails;
            if(details){
                if(details.length > 0){
                    this.handleProgramDetails();
                }
            }
            let days = [];
            this.setState({numberOfDays : details.length});
            for(var ii=0; ii< details.length;ii++){
                days.push({programDetails : details[ii].programDetails, programIndex : details[ii].programIndex});
            }
            this.setState({programInfo : days},function () {
            });
            let serviceInfoArray = [];
            for(var xx = 1; xx < jsonObject.servicesDetails.length ; xx++){
                serviceInfoArray.push(
                    {serviceStartDate: "", serviceEndDate: "",selectedServiceOption:'', city: '',selectedBreakfast:'', comments: '',
                        start: '', rooms: '' , breakfast:'' , car:'' , selectedService : '', selectedServiceCode:'',showCarType : false,
                        showHotel : false,sDate : new moment(),eDate: new moment(),service_type_id : '',
                        selectedType : ""}
                )
            }
            this.setState({serviceInfo : this.state.serviceInfo.concat(serviceInfoArray)},function () {
                if(jsonObject.servicesDetails.length > 0){
                    for(var sI = 0 ; sI < jsonObject.servicesDetails.length ; sI++){
                        let curServ = this.state.serviceInfo[sI];
                        curServ.sDate = this.convertFromStringToDate(jsonObject.servicesDetails[sI].serviceStartDate);
                        curServ.eDate = this.convertFromStringToDate(jsonObject.servicesDetails[sI].serviceEndDate);
                        curServ.serviceStartDate = jsonObject.servicesDetails[sI].serviceStartDate;
                        curServ.serviceEndDate = jsonObject.servicesDetails[sI].serviceEndDate;
                    }
                }
            });
            this.getAllservices();
        }
        else{
            this.getAllservices();
        }
    }

    componentDidMount = () => {

    }

    convertFromStringToDate = (s) => {
        let aDate = new moment();
        if(s != null && s != undefined){
            aDate = new moment(s.substring(0,10));
            aDate._d.setHours(s.substring(11,13));
            aDate._d.setMinutes(s.substring(14,16));
        }
        return aDate;
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
        if(departureDate > this.state.arrivingDate){
            const arrivingDate = this.state.arrivingDate;
            let nOfDays = Math.round((departureDate._d-arrivingDate._d)/(1000*60*60*24));
            this.setState({numberOfDays : nOfDays},function () {});
            let days =[];
            for(var i=0; i< nOfDays;i++){
                days.push({programDetails : '', programIndex : ''});
            }
            this.setState({programInfo : this.state.programInfo.concat(days)},function () {
                console.log("XXx");
                console.log(this.state.programInfo);
            });
        }
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

    generateDate = (date) => {
        var dateToConvert =  date._d;
        let aMonth = dateToConvert.getMonth();
        let aDay = dateToConvert.getDate();
        let aHours = dateToConvert.getHours();
        let aMinutes = dateToConvert.getMinutes();
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
        var aDate =  [dateToConvert.getFullYear(), aMonth,aDay, aHours, aMinutes].join('-');
        return aDate;
    }

    addBooking = () => {
        var aDate =  this.generateDate(this.state.arrivingDate);
        var sDate =  this.generateDate(this.state.departureDate);
        let xxx = this.state.programInfo;
        for(var programIndex =0 ; programIndex<xxx.length;programIndex++){
            if(xxx[programIndex].programIndex === ""){
                xxx.splice(programIndex, 1);
            }
        }
        let serviceInfoList = this.state.serviceInfo;
        for(var serIndex=0 ; serIndex< serviceInfoList.length;serIndex++){
            let currentService = this.state.serviceInfo[serIndex];
                var a = this.generateDate(currentService.sDate);
                var b = this.generateDate(currentService.eDate);
                currentService.serviceEndDate = b;
                currentService.serviceStartDate = a;
        }
        let aaaa = this.state.serviceInfo;
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
            "flightNumber" : this.state.flightNumber,
            "programDetails" : this.state.programInfo,
            "servicesDetails" : this.state.serviceInfo
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

    handleServicesType = (value) => {
        this.setState({ servicesType : value });
    }

    serviceInfoSelectedServiceChangeHandler = (idx) => (selectedServiceOption) => {
        let varShowCarType = false;
        let varShowHotel = false;
        if(selectedServiceOption !== undefined && selectedServiceOption !== null){
            if(selectedServiceOption.type === 0){
                varShowHotel = true;
            }
            else{
                varShowHotel = false;
            }
            if(selectedServiceOption.type === 1){
                varShowCarType = true;
            }
            else{
                varShowCarType = false;
            }
            const newService = this.state.serviceInfo.map((service, sidx) => {
                if (idx !== sidx) return service;
                return {...service, selectedService: selectedServiceOption.label, selectedServiceCode:selectedServiceOption.value,
                    selectedServiceOption:selectedServiceOption,
                    showCarType : varShowCarType, showHotel: varShowHotel,
                    selectedType : selectedServiceOption.value
                };
            });
            this.setState({serviceInfo: newService},function () {
                console.log("ASD");
            });
        }
    }

    serviceInfoSelectedBreakfastChangeHandler = (idx) => (selectedBreakfast) => {
        const newService = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx) return service;
            return {...service, breakfast: selectedBreakfast.value,selectedBreakfast:selectedBreakfast};
        });
        this.setState({serviceInfo: newService},function () {
        });
    }

    // getAllservices = (jsonObject) => {
    //     const headers = {
    //         'Content-Type' : 'application/json',
    //         'X-AUTH-TOKEN' : Functions.getCookies("token")
    //     }
    //     const body = null;
    //     const get = Functions.ajaxFunction("serviceType/all",headers, body,'GET');
    //     get.then((data) => data.json())
    //         .then((data) => {
    //                 if(data != null){
    //                     this.setState({services : data},function () {
    //                         let bookingType = "";
    //                         let serviceType = "";
    //                         if(jsonObject){
    //                             for(var sI = 0 ; sI < this.state.serviceInfo.length ; sI++){
    //                                 let curService = jsonObject.servicesDetails[sI];
    //                                 for(var ss=0;ss<this.state.services.length;ss++){
    //                                     if(Number(curService.selectedType) === this.state.services[ss].id){
    //                                         serviceType =  { value: this.state.services[ss].id, label: this.state.services[ss].serviceType, type :this.state.services[ss].type  };
    //                                         this.state.serviceInfo[sI].selectedServiceOption = serviceType;
    //                                         this.state.serviceInfo[sI].selectedType = serviceType.value;
    //                                         let varShowHotel = "";
    //                                         let varShowCarType = "";
    //                                         if(this.state.services[ss].type === 0){
    //                                             varShowHotel = true;
    //                                             this.state.serviceInfo[sI].rooms = curService.rooms;
    //                                             this.state.serviceInfo[sI].start = curService.start;
    //                                             this.state.serviceInfo[sI].breakfast = curService.breakfast;
    //                                         }
    //                                         else{
    //                                             varShowHotel = false;
    //                                         }
    //                                         if(this.state.services[ss].type === 1){
    //                                             varShowCarType = true;
    //                                             this.state.serviceInfo[sI].car = curService.car;
    //                                         }
    //                                         else{
    //                                             varShowCarType = false;
    //                                         }
    //                                         this.state.serviceInfo[sI].showHotel = varShowHotel;
    //                                         this.state.serviceInfo[sI].showCarType = varShowCarType;
    //                                     }
    //                                 }
    //                             }
    //                             let xx = this.state.serviceInfo;
    //                             for(var s=0;s<this.state.services.length;s++){
    //                                 if(Number(jsonObject.serviceType) === this.state.services[s].id){
    //                                     bookingType =  { value: this.state.services[s].id, label: this.state.services[s].serviceType, type :this.state.services[s].type  };
    //                                     this.setState({serviceTypeSelectedOption:bookingType},function () {
    //                                     })
    //                                 }
    //                             }
    //                         }
    //                     });
    //                 }
    //             }
    //         )
    //         .catch(
    //             (err) => {
    //                 console.log(err);
    //             }
    //         )
    // }

    addService = () => {
        this.setState({serviceInfo: this.state.serviceInfo.concat([{sDate: new moment(), eDate: new moment(),serviceStartDate : "", serviceEndDate:"",
                city: '', comments: '', start: '', rooms: '' , breakfast:'' , car:'' , selectedService : '', selectedServiceCode:'',
                showCarType:false,showHotel:false}])});
    }

    removeService = (idx) => () => {
        if(idx != 0){
            this.setState({serviceInfo: this.state.serviceInfo.filter((s, sidx) => idx !== sidx)});
        }
    }

    serviceInfoStartDateHandler = (idx) => (sDate) => {
        const newServices = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx){
                return service;
            }
            else{
                return {...service, sDate: sDate};
            }

        });
        this.setState({serviceInfo: newServices});
    }

    handleDetails = (idx) => (event) => {
        const newProgram = this.state.programInfo.map((programInfo, sidx) => {
            if (idx !== sidx){
                return programInfo;
            }
            else{
                return {...programInfo, programDetails: event.currentTarget.value , programIndex : idx};
            }

        });
        this.setState({programInfo: newProgram});
    }

    serviceInfoEndDateHandler = (idx) => (eDate) => {
        const newServices = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx){
                return service;
            }
            else{
                return {...service, eDate: eDate};
            }

        });
        this.setState({serviceInfo: newServices});
    }

    serviceInfoStarsHandler = (idx) => (event) => {
        const newServices = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx){
                return service;
            }
            else{
                return {...service, start: event.currentTarget.value};
            }

        });
        this.setState({serviceInfo: newServices});
    }

    serviceInfoCarHandler = (idx) => (event) => {
        const newServices = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx){
                return service;
            }
            else{
                return {...service, car: event.currentTarget.value};
            }

        });
        this.setState({serviceInfo: newServices});
    }

    serviceInfoRoomsHandler = (idx) => (event) => {
        const newServices = this.state.serviceInfo.map((service, sidx) => {
            if (idx !== sidx){
                return service;
            }
            else{
                return {...service, rooms: event.currentTarget.value};
            }

        });
        this.setState({serviceInfo: newServices});
    }

    handleProgramDetails = () => {
        let show = !this.state.showProgramDetails;
        this.setState({showProgramDetails : show},function () {})
    }

    render(){
        let servicesList = [];
        if(this.state.services){
            for(var i=0; i<this.state.services.length; i++){
                let d = new Object();
                d.value = this.state.services[i].id;
                d.label = this.state.services[i].serviceType;
                d.type = this.state.services[i].type;
                servicesList.push(d);
            }
            console.log(servicesList);
        }
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
                    services = {this.state.services}

                    firstName = {this.state.firstName}
                    lastName = {this.state.lastName}
                    nationality = {this.state.nationality}
                    whatsapp = {this.state.whatsapp}
                    handleProgramDetails = {this.handleProgramDetails}
                    showProgramDetails = {this.state.showProgramDetails}
                    numberOfDays = {this.state.numberOfDays}
                    email = {this.state.email}
                    arrivingCountry = {this.state.arrivingCountry}
                    arrivingAirport = {this.state.arrivingAirport}
                    flightNumber = {this.state.flightNumber}
                    serviceType = {this.state.serviceType}
                    currency = {this.state.currency}
                    isItNewBooking = {this.state.isItNewBooking}
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
                    handleDetails = {this.handleDetails}

                    handleServicesType = {this.handleServicesType}
                    removeSelectedService = {this.state.removeSelectedService}
                    servicesType = {this.state.servicesType}

                    sss={this.state.selectedServiceOption}
                    programInfo = {this.state.programInfo}
                    serviceInfo={this.state.serviceInfo.map((service, idx) => (

                        <div key={idx + 1} style={{marginTop: "10px"}}>
                            <div className="col-md-12">
                                <div className="form-group col-md-4">
                                    <label>تاريخ انتهاء هذه الخدمة</label>
                                    <DatePicker
                                        id="arrivingDate"
                                        locale="en"
                                        selected={service.eDate}
                                        onChange={this.serviceInfoEndDateHandler(idx)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="LLL"
                                        timeCaption="time"
                                    />
                                    {/*<DateTimePicker*/}
                                        {/*id="arrivingDate"*/}
                                        {/*locale="en"*/}
                                        {/*onChange={this.serviceInfoEndDateHandler(idx)}*/}
                                        {/*value={service.eDate}*/}
                                    {/*/>*/}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>تاريخ بدء هذه الخدمة</label>
                                    <DatePicker
                                        id="arrivingDate"
                                        locale="en"
                                        selected={service.sDate}
                                        onChange={this.serviceInfoStartDateHandler(idx)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="LLL"
                                        timeCaption="time"
                                    />
                                    {/*<DateTimePicker*/}
                                        {/*id="arrivingDate"*/}
                                        {/*locale="en-US"*/}
                                        {/*calendarType="US"*/}
                                        {/*onChange={this.serviceInfoStartDateHandler(idx)}*/}
                                        {/*value={service.sDate}*/}
                                    {/*/>*/}
                                </div>
                                <div className="form-group col-md-4">
                                    <label>نوع الخدمة</label>
                                    <Select
                                        name="form-field-name"
                                        options={servicesList}
                                        onChange={this.serviceInfoSelectedServiceChangeHandler(idx)}
                                        value={service.selectedServiceOption}

                                    />
                                </div>
                            </div>
                            {service.showHotel === false ? ""
                                :
                                <div className="col-md-12">
                                    <div className="form-group col-md-4">
                                        <label>عدد النجوم</label>
                                        <input className="form-control" type="text" value={service.start} onChange={this.serviceInfoStarsHandler(idx)}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>عدد الغرف</label>
                                        <input className="form-control" type="text" value={service.rooms} onChange={this.serviceInfoRoomsHandler(idx)}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>حالة الفطور</label>
                                        <Select
                                            name="form-field-name"
                                            value={service.selectedBreakfast}
                                            onChange={this.serviceInfoSelectedBreakfastChangeHandler(idx)}
                                            options={[
                                                {value: 1, label: 'مع افطار'},
                                                {value: 0, label: 'بدون افطار'}
                                            ]}
                                        />
                                    </div>

                                </div>
                            }
                            <div className="col-md-12">
                                <div className="form-group col-md-4" style={{textAlign : "center"}}>
                                    <h5 style={{color:"#FFF"}}>s</h5>
                                    <button type="button" className="btn btn-danger btn-number"
                                            onClick={this.removeService(idx)}><span
                                        className="glyphicon glyphicon-minus"></span></button>
                                    <button type="button" className="btn btn-success btn-number"
                                            onClick={this.addService}><span
                                        className="glyphicon glyphicon-plus"></span></button>
                                </div>
                                <div className="form-group col-md-4"></div>
                                {service.showCarType === false ? ""
                                    :
                                    <div className="form-group col-md-4">
                                        <label>نوع السيارة</label>
                                        <input className="form-control" type="text" value={service.car} onChange={this.serviceInfoCarHandler(idx)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}


                />
            </div>
        )
    }



}
export default BookingPage;