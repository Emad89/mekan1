import React from 'react';
import classes from '../../css/ValidationCss.css';
import Select from 'react-select';
import Functions from "../../helper/Functions";

const booking = (props) => {
    const inputNotValid = classes.inputNotValid;

    // let array = [];
    // if(props.users){
    //     for(let i = 0; i < props.users.length; i++){
    //         array.push(
    //             {
    //                 username : props.users[i].username,
    //                 rId : props.users[i].id
    //             }
    //         );
    //     }
    // }

    // const onRowClick = (state, rowInfo) => {
    //     return {
    //         onClick: e => {
    //             const row = rowInfo.original;
    //             if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-trash") ||
    //                 (e.target.classList[3] && e.target.classList[1].toString() === "deleteBtn")){
    //                 props.openDeleteEmployeeModal(row.username,row.rId);
    //             }
    //             else if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-pencil") ||
    //                 (e.target.classList[3] && e.target.classList[1].toString() === "editBtn")){
    //                 props.openEmployeeEditModal(row.username,row.rId);
    //             }
    //         }
    //     }
    // }
    //
    // const columns = [
    //     {
    //         columns: [
    //             {
    //                 expander: true,
    //                 Header: () => <strong>تعديل</strong>,
    //                 width: 65,
    //                 Expander: ({isExpanded, ...rest}) =>
    //                     <div>
    //                         <button style={{padding : "0px"}} className="btn btn-primary btn-xs editBtn" onClick={onRowClick}>
    //                             <span style={{padding : "5px"}} className="glyphicon glyphicon-pencil"></span>
    //                         </button>
    //                     </div>,
    //                 style: {
    //                     cursor: "pointer",
    //                     textAlign : "center"
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         columns: [
    //             {
    //                 expander: true,
    //                 Header: () => <strong>مسح</strong>,
    //                 width: 65,
    //                 Expander: ({isExpanded, ...rest}) =>
    //                     <div>
    //                         <button style={{padding : "0px"}} className="btn btn-danger btn-xs deleteBtn" onClick={onRowClick}>
    //                             <span style={{padding : "5px"}} className="glyphicon glyphicon-trash"></span>
    //                         </button>
    //                     </div>,
    //                 style: {
    //                     cursor: "pointer",
    //                     textAlign : "center"
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         columns: [
    //             {
    //                 Header: "اسم الموظف",
    //                 accessor: "username"
    //             }
    //         ]
    //     }
    // ]
    //
    //
    // const pageSize = 5;

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12" style={{marginBottom:"20px"}}>
                        <div className="col-md-6">
                            <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#allBookingInfo">ادخال كافة التفاصيل</button>
                        </div>
                        <div className="col-md-6" style={{textAlign:"right"}}>
                            <h2 style={{display:"inline-block"}}>الرجاء ادخال تفاصيل الحجز</h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label for="bookingState">الرجاء ادخال حالة الرحلة</label>
                            <Select
                                name="form-field-name"
                                className={(props.depotValid === false && props.submitted === true ? inputNotValid : '')}
                                value={props.depotSelectedOption}
                                onChange={props.depotChangeHandler}
                                options={[
                                    { value: 'one', label: 'One' },
                                    { value: 'two', label: 'Two' },
                                ]}
                            />
                        </div>
                        <div className="form-group">
                            <label for="phoneNumber">الرجاء ادخال رقم الهاتف للعميل</label>
                            <input id="phoneNumber" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="email">الرجاء ادخال الايميل للعميل</label>
                            <input id="email" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="remainPayment">المبلغ المتبقي</label>
                            <input id="remainPayment" className="form-control" disabled={true} value={props.remainPaymentValue}/>
                        </div>
                        <div className="form-group">
                            <label for="arrivingAirport">الرجاء ادخال مطار الوصول للعميل</label>
                            <input id="arrivingAirport" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="babies">الرجاء ادخال عدد الرضع</label>
                            <input id="babies" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="departureDate">الرجاء ادخال تاريخ المغادرة للعميل</label>
                            <input id="departureDate" className="form-control" onChange={props.handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label for="lastName">الرجاء ادخال كنية العميل</label>
                            <input id="lastName" className={"form-control " + (props.lastNameValid === false ? inputNotValid : '')}
                                   onChange={props.handleChange}/>
                            {props.lastNameValid === false ?
                                <small className="form-text text-muted errorMessage">
                                    الرجاء ادخال كنية العميل بالشكل الصحيح
                                </small> : ''
                            }
                        </div>
                        <div className="form-group">
                            <label for="lastName">الرجاء ادخال رقم الواتس اب العميل</label>
                            <input id="lastName" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="lastName">الرجاء ادخال بلد الوصول العميل</label>
                            <input id="lastName" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="paidAmount">الرجاء ادخال المبلغ المدفوع من قبل العميل</label>
                            <input id="paidAmount" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div>
                            <div className="form-group">
                                <label for="serviceType">الرجاء ادخال نوع الخدمة للعميل </label>
                                <input id="serviceType" className="form-control" onChange={props.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label for="children">الرجاء ادخال عدد الأطفال</label>
                                <input id="children" className="form-control" onChange={props.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label for="comments">الرجاء ادخال ملاحظات للعميل</label>
                                <textarea id="comments" className="form-control" onChange={props.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label for="firstName">الرجاء ادخال اسم العميل</label>
                            <input id="firstName" className={"form-control " + (props.firstNameValid === false ? inputNotValid : '')}
                                   onChange={props.handleChange}/>
                            {props.firstNameValid === false ?
                                <small className="form-text text-muted errorMessage">
                                    الرجاء ادخال اسم العميل بالشكل الصحيح
                                </small> : ''
                            }
                        </div>
                        <div className="form-group">
                            <label for="nationality">الرجاء ادخال جنسية العميل</label>
                            <input id="nationality" className={"form-control " + (props.nationalityValid === false ? inputNotValid : '')}
                                   onChange={props.handleChange}/>
                            {props.nationalityValid === false ?
                                <small className="form-text text-muted errorMessage">
                                    الرجاء ادخال جنسية بالشكل الصحيح
                                </small> : ''
                            }
                        </div>
                        <div className="form-group">
                            <label for="arrivingDate">الرجاء ادخال تاريخ الوصول للعميل</label>
                            <input id="arrivingDate" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="price">الرجاء ادخال سعر الخدمة للعميل</label>
                            <input id="price" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="flightNumber">الرجاء ادخال رقم الرحلة العميل</label>
                            <input id="flightNumber" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="adults">الرجاء ادخال عدد البالغين</label>
                            <input id="adults" className="form-control" onChange={props.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="details">الرجاء ادخال تفاصيل الرحلة للعميل</label>
                            <textarea id="details" className="form-control" onChange={props.handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default booking;