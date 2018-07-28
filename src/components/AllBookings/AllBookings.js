import React from 'react';
import ReactTable from 'react-table';
import Functions from "../../helper/Functions";
import 'react-table/react-table.css';
import BaseConfig from "../../BaseConfig";
import Modal from 'react-responsive-modal';

const allBookings = (props) => {

    let array = [];
    if(props.bookings){
        for(let i = 0; i < props.bookings.length; i++){
            let bookingState;
            if(props.bookings[i].bookingState == 0){
                bookingState = <div><p style={{display:"inline-block",width:"75%"}}>مؤكد</p><p style={{width:"15px",height:"15px",backgroundColor:"green",display:"inline-block",marginLeft:"11px",borderRadius:"50%"}}></p></div>;
            }
            if(props.bookings[i].bookingState == 1){
                bookingState = <div><p style={{display:"inline-block",width:"75%"}}>غير مؤكد</p><p style={{width:"15px",height:"15px",backgroundColor:"orange",display:"inline-block",marginLeft:"11px",borderRadius:"50%"}}></p></div>;
            }
            if(props.bookings[i].bookingState == 2){
                bookingState = <div><p style={{display:"inline-block",width:"75%"}}>ملغي</p><p style={{width:"15px",height:"15px",backgroundColor:"red",display:"inline-block",marginLeft:"11px",borderRadius:"50%"}}></p></div>;
            }
            array.push(
                {
                    firstName : props.bookings[i].firstName,
                    lastName : props.bookings[i].lastName,
                    nationality : props.bookings[i].nationality,
                    phone : props.bookings[i].phone,
                    bookingState : bookingState,
                    rId : props.bookings[i].id,
                    bookingStatus : props.bookings[i].bookingState,
                    whatsapp : props.bookings[i].whatsapp,
                    email : props.bookings[i].email,
                    arrivingCountry : props.bookings[i].arrivingCountry,
                    arrivingAirport : props.bookings[i].arrivingAirport,
                    flightNumber : props.bookings[i].flightNumber,
                    arrivingDate : props.bookings[i].arrivingDate,
                    departureDate : props.bookings[i].departureDate,
                    serviceType : props.bookings[i].serviceType,
                    details : props.bookings[i].details,
                    comments : props.bookings[i].comments,
                    price : props.bookings[i].price,
                    paidAmount : props.bookings[i].paidAmount,
                    remainPayment : props.bookings[i].remainPayment,
                    adults : props.bookings[i].adults,
                    babies : props.bookings[i].babies,
                    children : props.bookings[i].children
                }
            );
        }
    }

    const onRowClick = (state, rowInfo) => {
        return {
            onClick: e => {
                const row = rowInfo.original;
                if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-trash") ||
                    (e.target.classList[3] && e.target.classList[1].toString() === "deleteBtn")){
                    props.openDeleteBookingModal(row.rId);
                }
                else if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-pencil") ||
                    (e.target.classList[3] && e.target.classList[1].toString() === "editBtn")){
                    props.openEditBookingModal(row.rId,row.firstName,row.lastName,row.nationality,row.bookingStatus,row.whatsapp,row.email,row.arrivingCountry,
                        row.arrivingAirport,row.flightNumber,row.arrivingDate,row.departureDate,row.serviceType,row.details,
                        row.comments,row.price,row.paidAmount,row.remainPayment,row.adults,row.babies,row.children,row.phone);
                }
            }
        }
    }


    const columns = [
        {
            columns: [
                {
                    expander: true,
                    Header: () => <strong>تعديل</strong>,
                    width: 65,
                    Expander: ({isExpanded, ...rest}) =>
                        <div>
                            <button style={{padding : "0px"}} className="btn btn-primary btn-xs editBtn" onClick={onRowClick}>
                                <span style={{padding : "5px"}} className="glyphicon glyphicon-pencil"></span>
                            </button>
                        </div>,
                    style: {
                        cursor: "pointer",
                        textAlign : "center"
                    }
                }
            ]
        },
        {
            columns: [
                {
                    expander: true,
                    Header: () => <strong>مسح</strong>,
                    width: 65,
                    Expander: ({isExpanded, ...rest}) =>
                        <div>
                            <button style={{padding : "0px"}} className="btn btn-danger btn-xs deleteBtn" onClick={onRowClick}>
                                <span style={{padding : "5px"}} className="glyphicon glyphicon-trash"></span>
                            </button>
                        </div>,
                    style: {
                        cursor: "pointer",
                        textAlign : "center"
                    }
                }
            ]
        },
        {
            columns: [
                {
                    Header: "حالة الحجز",
                    accessor: "bookingState"
                }
            ]
        },
        {
            columns: [
                {
                    Header: "رقم الهاتف",
                    accessor: "phone"
                }
            ]
        },
        {
            columns: [
                {
                    Header: "الجنسية",
                    accessor: "nationality"
                }
            ]
        },
        {
            columns: [
                {
                    Header: "كنية العميل",
                    accessor: "lastName"
                }
            ]
        },
        {
            columns: [
                {
                    Header: "اسم العميل",
                    accessor: "firstName"
                }
            ]
        }
    ]


    const pageSize = 10;

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <a className="btn btn-primary" href={BaseConfig.frontEndUrl+"booking"}>اضافة حجز جديد</a>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <h2>الرحلات</h2>
                        <h4>معلومات جميع الرحلات</h4>
                    </div>
                </div>
                <div className="col-md-12" style={{marginTop : "20px"}}>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="table-responsive"  style={{marginTop : '30px', textAlign : 'center'}}>
                            <ReactTable
                                defaultPageSize = {pageSize}
                                data={array}
                                columns={columns}
                                filterable
                                getTrProps={onRowClick}
                            />
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>

            <Modal style={{padding:"20px", textAlign : "right"}} open={props.openDeleteBookingModalStatus} onClose={props.onDeleteCloseModal} little>
                <h3 style={{padding:"25px", textAlign :"right"}}>حذف الحجز </h3>
                <p>هل انت متاكد من حذف معلومات الحجز</p>
                <div style={{textAlign:"center"}}>
                    <button style={{marginRight:"10px"}} class="btn btn-danger" disabled={props.btnDisable} onClick={props.deleteBooking}>
                        نعم</button>
                    <button class="btn btn-secondary"  onClick={props.onDeleteCloseModal}>كلا</button>
                </div>
            </Modal>
        </div>
    );
}
export default allBookings;