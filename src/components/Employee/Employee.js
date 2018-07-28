import React from 'react';
import Modal from 'react-responsive-modal';
import ReactTable from 'react-table';
import classes from '../../css/ValidationCss.css';
import Functions from "../../helper/Functions";
import 'react-table/react-table.css';

const employee = (props) => {
    const inputNotValid = classes.inputNotValid;

    let array = [];
    if(props.users){
        for(let i = 0; i < props.users.length; i++){
            array.push(
                {
                    username : props.users[i].username,
                    rId : props.users[i].id
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
                    props.openDeleteEmployeeModal(row.username,row.rId);
                }
                else if((e.target.classList[1] && e.target.classList[1].toString() === "glyphicon-pencil") ||
                    (e.target.classList[3] && e.target.classList[1].toString() === "editBtn")){
                    props.openEmployeeEditModal(row.username,row.rId);
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
                    Header: "اسم الموظف",
                    accessor: "username"
                }
            ]
        }
    ]


    const pageSize = 5;

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <button className="btn btn-primary" onClick={props.newEmployeeModal}>اضافة موظف جديد</button>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <h2>الموظفون</h2>
                        <h4>معلومات جميع الموظفيين</h4>
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
            <Modal style={{padding: "30px;", textAlign: "right"}} open={props.openEmployeeModal} onClose={props.closeEmployeeModal} little>
                <h3 style={{padding: "30px"}}>الرجاء ادخال معلومات الموظف</h3>
                <div className="form-group">
                    <label for="email">الرجاء ادخال البريد الالكتروني للموظف</label>
                    <input id="email" className={"form-control " + (props.emailValid === false ? inputNotValid : '')}
                           onChange={props.handleChange}/>
                    {props.emailValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال معلومات الايميل بالشكل الصحيح
                        </small> : ''
                    }
                </div>
                <div className="form-group">
                    <label for="password">الرجاء ادخال كلمة السر للموظف</label>
                    <input id="password"
                           className={"form-control " + (props.passwordValid === false ? inputNotValid : '')}
                           onChange={props.handleChange}/>
                    {props.passwordValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال معلومات الايميل بالشكل الصحيح
                        </small> : ''
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" disabled={props.btnDisable} className="btn btn-primary btn-lg"
                            onClick={props.addEmployee} style={{width: '100%'}}><span
                        className="glyphicon glyphicon-ok-sign"></span>تسجيل معلومات الموظف
                    </button>
                    {props.addEmployeeFormValid === false ?
                        <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال المعلومات</p> : ''
                    }
                </div>
            </Modal>
            <Modal style={{padding: "30px;", textAlign: "right"}} open={props.openEmployeeEditModalStatus} onClose={props.closeEmployeeEditModal} little>
                <h3 style={{padding: "30px"}}>الرجاء ادخال كلمة السر الجديدة للموظف</h3>
                <div className="form-group">
                    <label for="email">الرجاء ادخال البريد الالكتروني للموظف</label>
                    <input id="email" className={"form-control " + (props.emailValid === false ? inputNotValid : '')}
                           onChange={props.handleChange} value={props.emailValue} disabled={true}/>
                    {props.emailValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال معلومات الايميل بالشكل الصحيح
                        </small> : ''
                    }
                </div>
                <div className="form-group">
                    <label for="password">الرجاء ادخال كلمة السر للموظف</label>
                    <input id="password"
                           className={"form-control " + (props.passwordValid === false ? inputNotValid : '')}
                           onChange={props.handleChange}/>
                    {props.passwordValid === false ?
                        <small className="form-text text-muted errorMessage">
                            الرجاء ادخال معلومات الايميل بالشكل الصحيح
                        </small> : ''
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" disabled={props.btnDisable} className="btn btn-warning btn-lg"
                            onClick={props.updateEmployee} style={{width: '100%'}}><span
                        className="glyphicon glyphicon-ok-sign"></span>تعديل معلومات الموظف
                    </button>
                    {props.addEmployeeFormValid === false ?
                        <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال المعلومات</p> : ''
                    }
                </div>
            </Modal>
            <Modal style={{padding:"20px", textAlign : "right"}} open={props.openDeleteEmployeeModalStatus} onClose={props.onDeleteCloseModal} little>
                <h3 style={{padding:"25px", textAlign :"right"}}>حذف الموظف </h3>
                <p>هل انت متاكد من حذف معلومات الموظف</p>
                <div style={{textAlign:"center"}}>
                    <button style={{marginRight:"10px"}} class="btn btn-danger" disabled={props.btnDisable} onClick={props.deleteEmployee}>
                        نعم</button>
                    <button class="btn btn-secondary"  onClick={props.onDeleteCloseModal}>كلا</button>
                </div>
            </Modal>
        </div>
    );
}
export default employee;