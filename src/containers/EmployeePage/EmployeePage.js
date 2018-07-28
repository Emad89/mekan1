import React , {Component} from 'react';
import Employee from '../../components/Employee/Employee';
import Functions from '../../helper/Functions';
import MenuPage from '../MenuPage/MenuPage';

class EmployeePage extends Component{

    state = {
        openEmployeeModal : false,
        openEmployeeEditModal : false,
        email : '',
        emailValid : true,
        password : '',
        passwordValid : true,
        inputArray : [],
        addEmployeeFormValid : true,
        btnDisable : false,
        openDeleteEmployeeModal : false,
        users : ''
    }

    componentDidMount = () => {
        this.getAllEmployees();
    }

    getAllEmployees = () => {
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = null;
        const get = Functions.ajaxFunction("employee/getEmployees",headers, body,'GET');
        get.then((data) => data.json())
            .then((data) => {
                    if(data != null){
                        console.log(data);
                        this.setState({users : data});
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    openEmployeeModal = () => {
        this.setState({openEmployeeModal: true});
    }

    closeEmployeeModal = () => {
        this.setState({openEmployeeModal : false});
        this.clearData();
    }

    closeEmployeeEditModal = () => {
        this.setState({openEmployeeEditModal : false});
        this.clearData();
    }

    clearData = () =>{
        this.setState({email: '', password:'', emailValid:true, passwordValid:true, inputArray:[], addEmployeeFormValid:true})
    }

    handleChange = (e) => {
        let data = new Object();
        data.id = e.target.id;
        data.value = e.target.value;
        this.setState({[data.id]: data.value});
        this.checkRequiredFields(data);
    }

    checkRequiredFields = (data) => {
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


    addEmployee = () => {
       const array = Functions.validateFunction(this.state.inputArray);
       const isItValid = Functions.checkFalseElements(array,2);
       if(isItValid == true){
           this.setState({addEmployeeFormValid : false});
       }
       else{
           this.setState({addEmployeeFormValid : true, btnDisable : true});
           const headers = {
               'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
           }
           const body = {
               "username" : this.state.email,
               "password" : this.state.password,
           }
           const post = Functions.ajaxFunction("employee/addEmployee",headers, JSON.stringify(body),'POST');
           post.then((data) => data.json())
               .then((data) => {
                   this.setState({btnDisable : false});
                       if(data != null){
                           Functions.alertNotification("تم اضافة معلومات الموظف بنجاح", "success");
                           this.closeEmployeeModal();
                           this.getAllEmployees();
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

    updateEmployee = () => {
        const array = Functions.validateFunction(this.state.inputArray);
        const isItValid = Functions.checkFalseElements(array,1);
        if(isItValid == true){
            this.setState({addEmployeeFormValid : false});
        }
        else{
            this.setState({addEmployeeFormValid : true, btnDisable : true});
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = {
                "username" : this.state.email,
                "password" : this.state.password,
            }
            const post = Functions.ajaxFunction("employee/updateUser",headers, JSON.stringify(body),'PUT');
            post.then((data) => data)
                .then((data) => {
                        this.setState({btnDisable : false});
                        if(data.status == "200"){
                            Functions.alertNotification("تم تعديل معلومات الموظف بنجاح", "success");
                            this.closeEmployeeEditModal();
                            this.getAllEmployees();
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

    openEditEmployeeModal = (username,rId) =>{
        this.setState({openEmployeeEditModal: true,email : username , id:rId});
    }

    onDeleteCloseModal = () => {
        this.setState({openDeleteEmployeeModal : false});
        this.getAllEmployees();
    }

    deleteEmployee = () => {
            this.setState({addEmployeeFormValid : true, btnDisable : true});
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = {
                "username" : this.state.email,
                "password" : this.state.password,
            }
            const post = Functions.ajaxFunction("employee/deleteEmployee",headers, JSON.stringify(body),'DELETE');
            post.then((data) => data)
                .then((data) => {
                        this.setState({btnDisable : false});
                        if(data.status == "200"){
                            Functions.alertNotification("تم حذف معلومات الموظف بنجاح", "error");
                            this.onDeleteCloseModal();
                            this.getAllEmployees();
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                    }
                )

    }

    openDeleteEmployeeModal = (username,rId) =>{
        this.setState({openDeleteEmployeeModal: true,email : username , id:rId});
    }

    render(){
        return(
            <div>
                <MenuPage/>
                <Employee
                    newEmployeeModal = {this.openEmployeeModal}
                    openEmployeeModal = {this.state.openEmployeeModal}
                    closeEmployeeModal = {this.closeEmployeeModal}
                    openEmployeeEditModal = {this.openEditEmployeeModal}
                    closeEmployeeEditModal = {this.closeEmployeeEditModal}
                    onDeleteCloseModal = {this.onDeleteCloseModal}
                    openDeleteEmployeeModalStatus = {this.state.openDeleteEmployeeModal}
                    openDeleteEmployeeModal = {this.openDeleteEmployeeModal}
                    openEmployeeEditModalStatus = {this.state.openEmployeeEditModal}
                    handleChange = {this.handleChange}
                    emailValid = {this.state.emailValid}
                    passwordValid = {this.state.passwordValid}
                    addEmployeeFormValid = {this.state.addEmployeeFormValid}
                    btnDisable = {this.state.btnDisable}
                    addEmployee = {this.addEmployee}
                    updateEmployee = {this.updateEmployee}
                    deleteEmployee = {this.deleteEmployee}
                    users = {this.state.users}
                    emailValue = {this.state.email}
                />
            </div>
        )
    }
}
export default EmployeePage;