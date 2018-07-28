import React from 'react';
import classes from '../../css/ValidationCss.css';
import Select from 'react-select';
import Functions from "../../helper/Functions";

const bookingDetails = (props) => {
    const inputNotValid = classes.inputNotValid;

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title pull-right" style={{display:"inline-block"}}>اسم العميل و الكنية</h3>
                                <div className="panel-title" style={{display:"inline-block",width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"red"}}>الحالة</div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://locker.com.au/wp-content/uploads/2017/01/user-icon-png-person-user-profile-icon-20.png" className="img-circle img-responsive"/> </div>
                                    <div className=" col-md-9 col-lg-9 ">
                                        <table className="table table-user-information">
                                            <tbody>
                                            <tr>
                                                <td>Department:</td>
                                                <td>Programming</td>
                                            </tr>
                                            <tr>
                                                <td>Hire date:</td>
                                                <td>06/23/2013</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Birth</td>
                                                <td>01/24/1988</td>
                                            </tr>

                                            <tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td>Female</td>
                                                </tr>
                                                <tr>
                                                    <td>Home Address</td>
                                                    <td>Kathmandu,Nepal</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td><a href="mailto:info@support.com">info@support.com</a></td>
                                                </tr>
                                                <td>Phone Number</td>
                                                <td>123-4567-890(Landline)555-4567-890(Mobile)
                                                </td>

                                            </tr>

                                            </tbody>
                                        </table>

                                        <a href="#" className="btn btn-primary">My Sales Performance</a>
                                        <a href="#" className="btn btn-primary">Team Sales Performance</a>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
                                <span className="pull-right">
                            <a href="edit.html" data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="glyphicon glyphicon-edit"></i></a>
                            <a data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="glyphicon glyphicon-remove"></i></a>
                        </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="row">*/}
                {/*<div className="col-md-12">*/}
                    {/*<div className="col-md-12" style={{marginBottom:"20px"}}>*/}
                        {/*<div className="col-md-6">*/}
                            {/*<button type="button" className="btn btn-info" data-toggle="collapse" data-target="#allBookingInfo">ادخال كافة التفاصيل</button>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-6" style={{textAlign:"right"}}>*/}
                            {/*<h2 style={{display:"inline-block"}}>تفاصيل الحجز</h2>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12">*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="bookingState">الرجاء ادخال حالة الرحلة</label>*/}
                                {/*<Select*/}
                                    {/*name="form-field-name"*/}
                                    {/*className={(props.depotValid === false && props.submitted === true ? inputNotValid : '')}*/}
                                    {/*value={props.depotSelectedOption}*/}
                                    {/*onChange={props.depotChangeHandler}*/}
                                    {/*options={[*/}
                                        {/*{ value: 0, label: 'مؤكد' },*/}
                                        {/*{ value: 1, label: 'غير مؤكد' },*/}
                                        {/*{ value: 2, label: 'ملغي' },*/}
                                    {/*]}*/}
                                {/*/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="lastName">الرجاء ادخال كنية العميل</label>*/}
                                {/*<input id="lastName" className={"form-control " + (props.lastNameValid === false ? inputNotValid : '')}*/}
                                       {/*onChange={props.handleChange}/>*/}
                                {/*{props.lastNameValid === false ?*/}
                                    {/*<small className="form-text text-muted errorMessage">*/}
                                        {/*الرجاء ادخال كنية العميل بالشكل الصحيح*/}
                                    {/*</small> : ''*/}
                                {/*}*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="firstName">الرجاء ادخال اسم العميل</label>*/}
                                {/*<input id="firstName" className={"form-control " + (props.firstNameValid === false ? inputNotValid : '')}*/}
                                       {/*onChange={props.handleChange}/>*/}
                                {/*{props.firstNameValid === false ?*/}
                                    {/*<small className="form-text text-muted errorMessage">*/}
                                        {/*الرجاء ادخال اسم العميل بالشكل الصحيح*/}
                                    {/*</small> : ''*/}
                                {/*}*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="nationality">الرجاء ادخال جنسية العميل</label>*/}
                                {/*<input id="nationality" className={"form-control " + (props.nationalityValid === false ? inputNotValid : '')}*/}
                                       {/*onChange={props.handleChange}/>*/}
                                {/*{props.nationalityValid === false ?*/}
                                    {/*<small className="form-text text-muted errorMessage">*/}
                                        {/*الرجاء ادخال جنسية بالشكل الصحيح*/}
                                    {/*</small> : ''*/}
                                {/*}*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12 collapse" id="allBookingInfo">*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="phoneNumber">الرجاء ادخال رقم الهاتف للعميل</label>*/}
                                {/*<input id="phoneNumber" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="email">الرجاء ادخال الايميل للعميل</label>*/}
                                {/*<input id="email" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="remainPayment">المبلغ المتبقي</label>*/}
                                {/*<input id="remainPayment" className="form-control" disabled={true} value={props.remainPaymentValue}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="arrivingAirport">الرجاء ادخال مطار الوصول للعميل</label>*/}
                                {/*<input id="arrivingAirport" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="babies">الرجاء ادخال عدد الرضع</label>*/}
                                {/*<input id="babies" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="lastName">الرجاء ادخال رقم الواتس اب العميل</label>*/}
                                {/*<input id="lastName" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="lastName">الرجاء ادخال بلد الوصول العميل</label>*/}
                                {/*<input id="lastName" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="paidAmount">الرجاء ادخال المبلغ المدفوع من قبل العميل</label>*/}
                                {/*<input id="paidAmount" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                                {/*<div className="form-group">*/}
                                    {/*<label for="serviceType">الرجاء ادخال نوع الخدمة للعميل </label>*/}
                                    {/*<input id="serviceType" className="form-control" onChange={props.handleChange}/>*/}
                                {/*</div>*/}
                                {/*<div className="form-group">*/}
                                    {/*<label for="children">الرجاء ادخال عدد الأطفال</label>*/}
                                    {/*<input id="children" className="form-control" onChange={props.handleChange}/>*/}
                                {/*</div>*/}
                                {/*<div className="form-group">*/}
                                    {/*<label for="comments">الرجاء ادخال ملاحظات للعميل</label>*/}
                                    {/*<textarea id="comments" className="form-control" onChange={props.handleChange}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4">*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="arrivingDate">الرجاء ادخال تاريخ الوصول للعميل</label>*/}
                                {/*<input id="arrivingDate" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="price">الرجاء ادخال سعر الخدمة للعميل</label>*/}
                                {/*<input id="price" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="flightNumber">الرجاء ادخال رقم الرحلة العميل</label>*/}
                                {/*<input id="flightNumber" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="adults">الرجاء ادخال عدد البالغين</label>*/}
                                {/*<input id="adults" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="details">الرجاء ادخال تفاصيل الرحلة للعميل</label>*/}
                                {/*<textarea id="details" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*<label for="departureDate">الرجاء ادخال تاريخ المغادرة للعميل</label>*/}
                                {/*<input id="departureDate" className="form-control" onChange={props.handleChange}/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12" style={{textAlign:"center"}}>*/}
                        {/*<button type="button" className="btn btn-primary btn-lg"><span class="glyphicon glyphicon-ok-sign"></span>تسجيل معلومات العميل</button>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );
}
export default bookingDetails;