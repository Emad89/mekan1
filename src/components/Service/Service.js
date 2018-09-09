import React from 'react';
import Modal from 'react-responsive-modal';
import ReactTable from 'react-table';
import classes from '../../css/ValidationCss.css';
import Functions from "../../helper/Functions";
import 'react-table/react-table.css';
import Select from 'react-select';

const service = (props) => {
    const inputNotValid = classes.inputNotValid;

    let array = [];
    if(props.services){
        for(let i = 0; i < props.services.length; i++){
            let type = "";
            if(props.services[i].type === 0){
                type = "حجز فندق"
            }
            if(props.services[i].type === 1){
                type = "سيارات"
            }
            array.push(
                {
                    serviceName : props.services[i].serviceType,
                    rId : props.services[i].id,
                    serviceType :type
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
                    props.openDeleteserviceModal(row.serviceName,row.rId,row.serviceType);
                }
                else if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-pencil") ||
                    (e.target.classList[3] && e.target.classList[1].toString() === "editBtn")){
                    props.openserviceEditModal(row.serviceName,row.rId,row.serviceType);
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
                    Header: "نوع الخدمة",
                    accessor: "serviceType"
                },
                {
                    Header: "اسم الخدمة",
                    accessor: "serviceName"
                }
            ],
        }
    ]


    const pageSize = 5;

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <button className="btn btn-primary" onClick={props.newserviceModal}>اضافة خدمة جديد</button>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <h2>الخدمات</h2>
                        <h4>معلومات جميع الخدمات</h4>
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
            <Modal style={{padding: "30px;", textAlign: "right"}} open={props.openserviceModal} onClose={props.closeserviceModal} little>
                <h3 style={{padding: "30px"}}>الرجاء ادخال معلومات الخدمة</h3>
                <div className="form-group">
                    <label for="serviceName">الرجاء ادخال اسم الخدمة</label>
                    <input id="serviceName" className={"form-control " + (props.serviceNameValid === false ? inputNotValid : '')}
                           onChange={props.handleChange}/>
                    {props.serviceNameValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال اسم الخدمة
                        </small> : ''
                    }
                </div>
                <div className="form-group">
                    <label for="serviceType">نوع الخدمة</label>
                    <Select
                        id="serviceType"
                        name="form-field-name"
                        value={props.serviceTypeSelectedOption}
                        onChange={props.serviceTypeChangeHandler}
                        options={[
                            { value: 0, label: 'حجز فندق' },
                            { value: 1, label: 'سيارات' },
                        ]}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" disabled={props.btnDisable} className="btn btn-primary btn-lg"
                            onClick={props.addservice} style={{width: '100%'}}><span
                        className="glyphicon glyphicon-ok-sign"></span>تسجيل معلومات الخدمة
                    </button>
                    {props.addserviceFormValid === false ?
                        <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال المعلومات</p> : ''
                    }
                </div>
            </Modal>
            <Modal style={{padding: "30px;", textAlign: "right"}} open={props.openserviceEditModalStatus} onClose={props.closeserviceEditModal} little>
                <h3 style={{padding: "30px"}}>الرجاء ادخال معلومات الخدمة</h3>
                <div className="form-group">
                    <label for="serviceName">الرجاء ادخال اسم الخدمة</label>
                    <input id="serviceName" className={"form-control " + (props.serviceNameValid === false ? inputNotValid : '')}
                           onChange={props.handleChange} value={props.serviceNameValue}/>
                    {props.serviceNameValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال اسم الخدمة
                        </small> : ''
                    }
                </div>
                <div className="form-group">
                    <label for="serviceType">نوع الخدمة</label>
                    <Select
                        id="serviceType"
                        name="form-field-name"
                        value={props.serviceTypeSelectedOption}
                        onChange={props.serviceTypeChangeHandler}
                        options={[
                            { value: 0, label: 'حجز فندق' },
                            { value: 1, label: 'سيارات' },
                        ]}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" disabled={props.btnDisable} className="btn btn-warning btn-lg"
                            onClick={props.updateservice} style={{width: '100%'}}><span
                        className="glyphicon glyphicon-ok-sign"></span>تعديل معلومات الخدمة
                    </button>
                    {props.addserviceFormValid === false ?
                        <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال المعلومات</p> : ''
                    }
                </div>
            </Modal>
            <Modal style={{padding:"20px", textAlign : "right"}} open={props.openDeleteserviceModalStatus} onClose={props.onDeleteCloseModal} little>
                <h3 style={{padding:"25px", textAlign :"right"}}>حذف الخدمة </h3>
                <p>هل انت متاكد من حذف معلومات الخدمة</p>
                <div style={{textAlign:"center"}}>
                    <button style={{marginRight:"10px"}} class="btn btn-danger" disabled={props.btnDisable} onClick={props.deleteservice}>
                        نعم</button>
                    <button class="btn btn-secondary"  onClick={props.onDeleteCloseModal}>كلا</button>
                </div>
            </Modal>
        </div>
    );
}
export default service;