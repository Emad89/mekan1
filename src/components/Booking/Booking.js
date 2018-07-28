import React from 'react';
import Select from 'react-select';
import Functions from "../../helper/Functions";
import DateTimePicker from 'react-datetime-picker';
import classes from '../../css/ValidationCss.css';

const booking = (props) => {
    const inputNotValid = classes.inputNotValid;
    let isItTrue = false;
    if(props.isItUpdate === true){
        isItTrue = true;
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12" style={{marginBottom:"20px",padding:"20px",backgroundColor:"#f3f3b5ad"}}>
                        <div>
                            <h2 style={{display:"inline-block",position:"absolute",right:"30px"}}>تفاصيل الحجز</h2>
                            <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#allBookingInfo">ادخال كافة التفاصيل</button>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div style={{padding:"10px",marginBottom:"15px"}}>
                            <h4 style={{textAlign:"center",color:"#ffa775"}}>المعلومات الشخصية للعميل<i style={{marginLeft:"10px"}} className="fas fa-user"></i></h4>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label for="bookingState">حالة الرحلة</label>
                                <Select
                                    name="form-field-name"
                                    className={(props.bookingStateValid === false && props.addBookingFormValid === true ? inputNotValid : '')}
                                    value={props.bookingStateSelectedOption}
                                    onChange={props.bookingStateChangeHandler}
                                    disabled={isItTrue}
                                    options={[
                                        { value: 0, label: 'مؤكد' },
                                        { value: 1, label: 'غير مؤكد' },
                                        { value: 2, label: 'ملغي' },
                                    ]}
                                />
                                {props.bookingStateValid === false && props.addBookingFormValid === true ?
                                    <small className="form-text text-muted" style={{"color":"red","textAlign":"left","marginLeft": "5px","display":"block"}}>
                                        الرجاء ادخال حالة الحجز
                                    </small> : ''
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label for="lastName">كنية العميل</label>
                                <input id="lastName" className={"form-control " + (props.lastNameValid === false ? inputNotValid : '')}
                                       onChange={props.handleChange} value={props.lastName} disabled={isItTrue}/>
                                {props.lastNameValid === false ?
                                    <small className="form-text text-muted errorMessage">
                                        الرجاء ادخال كنية العميل بالشكل الصحيح
                                    </small> : ''
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label for="firstName">اسم العميل</label>
                                <input id="firstName" className={"form-control " + (props.firstNameValid === false ? inputNotValid : '')}
                                       onChange={props.handleChange} value={props.firstName} disabled={isItTrue}/>
                                {props.firstNameValid === false ?
                                    <small className="form-text text-muted errorMessage">
                                        الرجاء ادخال اسم العميل بالشكل الصحيح
                                    </small> : ''
                                }
                            </div>
                            <div className="form-group">
                                <label for="nationality">جنسية العميل</label>
                                <input id="nationality" className={"form-control " + (props.nationalityValid === false ? inputNotValid : '')}
                                       onChange={props.handleChange} value={props.nationality} disabled={isItTrue}/>
                                {props.nationalityValid === false ?
                                    <small className="form-text text-muted errorMessage">
                                        الرجاء ادخال جنسية بالشكل الصحيح
                                    </small> : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 collapse" id="allBookingInfo">
                        <div className="col-md-12">
                            <div style={{padding:"10px",marginBottom:"15px"}}>
                                <h4 style={{textAlign:"center",color:"#ffa775",marginBottom:"15px"}}>معلومات التواصل مع العميل<i style={{marginLeft:"10px"}} className="fas fa-phone-volume"></i></h4>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="phone">رقم الهاتف للعميل</label>
                                    <input id="phone" className="form-control" onChange={props.handleChange} value={props.phone} disabled={isItTrue}/>
                                </div>

                                {/*<div className="form-group">*/}
                                {/*<label for="remainPayment">المبلغ المتبقي</label>*/}
                                {/*<input id="remainPayment" className="form-control" disabled={true} value={props.remainPaymentValue}/>*/}
                                {/*</div>*/}
                                {/*<div className="form-group">*/}
                                {/*<label for="arrivingAirport">مطار الوصول للعميل</label>*/}
                                {/*<input id="arrivingAirport" className="form-control" onChange={props.handleChange}/>*/}
                                {/*</div>*/}
                                {/*<div className="form-group">*/}
                                {/*<label for="babies">عدد الرضع</label>*/}
                                {/*<input id="babies" className="form-control" onChange={props.handleChange}/>*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="email">الايميل للعميل</label>
                                    <input id="email" className="form-control" onChange={props.handleChange} value={props.email} disabled={props.isItUpdate}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="whatsapp">رقم الواتس اب العميل</label>
                                    <input id="whatsapp" className="form-control" onChange={props.handleChange} value={props.whatsapp} disabled={props.isItUpdate}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{padding:"10px",marginTop:"15px"}}>
                                <h4 style={{textAlign:"center",color:"#ffa775",marginBottom:"15px"}}>معلومات رحلة العميل<i style={{marginLeft:"10px"}} className="fas fa-suitcase"></i></h4>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                <label for="arrivingAirport">مطار الوصول للعميل</label>
                                <input id="arrivingAirport" className="form-control" onChange={props.handleChange} value={props.arrivingAirport} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                <label for="arrivingCountry">بلد الوصول العميل</label>
                                <input id="arrivingCountry" className="form-control" onChange={props.handleChange} value={props.arrivingCountry} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="serviceType">نوع الخدمة للعميل </label>
                                    <Select
                                        id="serviceType"
                                        name="form-field-name"
                                        value={props.serviceTypeSelectedOption}
                                        disabled={isItTrue}
                                        onChange={props.serviceTypeChangeHandler}
                                        options={[
                                            { value: 0, label: 'حجز فندق' },
                                            { value: 1, label: 'شقة فندقية' },
                                            { value: 2, label: 'كوخ خشبي' },
                                            { value: 3, label: 'سيارة صغيرة مع سائق' },
                                            { value: 4, label: 'سيارة اقتصادية عائلية مع سائق' },
                                            { value: 5, label: 'سيارة فاخرة عائلية مع سائق' },
                                            { value: 6, label: 'سيارة اقتصادية عائلية مع سائق' },
                                            { value: 7, label: 'باص 13 راكب' },
                                            { value: 8, label: 'برنامج سياحي كامل' },
                                            { value: 9, label: 'يخت خاص' },
                                            { value: 10, label: 'سهرة عشاء بوسفور' }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="departureDate">تاريخ المغادرة للعميل</label>
                                    <DateTimePicker
                                        id="arrivingDate"
                                        onChange={props.departureDateHandler}
                                        value={props.departureDate}
                                        disabled={isItTrue}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="arrivingDate">تاريخ الوصول للعميل</label>
                                    <DateTimePicker
                                        id="arrivingDate"
                                        onChange={props.arrivingDateHandler}
                                        value={props.arrivingDate}
                                        disabled={isItTrue}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="flightNumber">رقم الرحلة العميل</label>
                                    <input id="flightNumber" className="form-control" onChange={props.handleChange} value={props.flightNumber} disabled={isItTrue}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{padding:"10px",marginTop:"15px"}}>
                                <h4 style={{textAlign:"center",color:"#ffa775",marginBottom:"15px"}}>معلومات عائلة العميل<i style={{marginLeft:"10px"}} className="fas fa-users"></i></h4>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="babies">عدد الرضع</label>
                                    <input id="babies" className="form-control" onChange={props.handleChange} value={props.babies} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="children">عدد الأطفال</label>
                                    <input id="children" className="form-control" onChange={props.handleChange} value={props.children} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="adults">عدد البالغين</label>
                                    <input id="adults" className="form-control" onChange={props.handleChange} value={props.adults} disabled={isItTrue}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{padding:"10px",marginTop:"15px"}}>
                                <h4 style={{textAlign:"center",color:"#ffa775",marginBottom:"15px"}}>معلومات الدفع للعميل<i style={{marginLeft:"10px"}} className="fas fa-hand-holding-usd"></i></h4>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="remainPayment">المبلغ المتبقي</label>
                                    <input id="remainPayment" className="form-control" disabled={true} value={props.remainPayment} disabled={isItTrue}  value={props.remainPayment}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="paidAmount">المبلغ المدفوع من قبل العميل</label>
                                    <input id="paidAmount" className="form-control" onChange={props.handleChange} value={props.paidAmount} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="price">سعر الخدمة للعميل</label>
                                    <input id="price" className="form-control" onChange={props.handleChange} value={props.price} disabled={isItTrue}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{padding:"10px",marginTop:"15px"}}>
                                <h4 style={{textAlign:"center",color:"#ffa775",marginBottom:"15px"}}>تفاصيل العميل<i style={{marginLeft:"10px"}} className="fas fa-info-circle"></i></h4>
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="details">تفاصيل الرحلة للعميل</label>
                                    <textarea id="details" className="form-control" onChange={props.handleChange} value={props.details} disabled={isItTrue}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="comments">ملاحظات للعميل</label>
                                    <textarea id="comments" className="form-control" onChange={props.handleChange} value={props.comments} disabled={isItTrue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" style={{textAlign:"center"}}>
                        {isItTrue === false ?
                            <button type="button" disabled={props.btnDisable} className="btn btn-primary btn-lg"
                                    onClick={props.addBooking}><span className="glyphicon glyphicon-ok-sign"></span>تسجيل معلومات العميل
                            </button>
                        : '' }

                        {props.addBookingFormValid === false ?
                            <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال الاسم و الكنية و الجنسية و حالة الحجز</p> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default booking;