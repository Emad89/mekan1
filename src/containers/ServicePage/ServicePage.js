import React , {Component} from 'react';
import Service from '../../components/Service/Service';
import Functions from '../../helper/Functions';
import MenuPage from '../MenuPage/MenuPage';
import BaseConfig from "../../BaseConfig";

class ServicePage extends Component{

    state = {
        openserviceModal : false,
        openserviceEditModal : false,
        serviceName : '',
        serviceNameValid : true,
        serviceTypeSelectedOption : '',
        inputArray : [],
        serviceType : '',
        addserviceFormValid : true,
        btnDisable : false,
        openDeleteserviceModal : false,
        services : '',
        id : ''
    }

    componentDidMount = () => {
        if(Functions.getCookies("role") !== "ADMIN"){
            window.location.href = BaseConfig.frontEndUrl + "home";
        }
        this.getAllservices();
    }

    getAllservices = () => {
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = null;
        const get = Functions.ajaxFunction("serviceType/all",headers, body,'GET');
        get.then((data) => data.json())
            .then((data) => {
                    if(data != null){
                        this.setState({services : data});
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    serviceTypeChangeHandler = (serviceTypeSelectedOption) => {
        if(serviceTypeSelectedOption !== undefined && serviceTypeSelectedOption !== null){
            this.setState({ serviceTypeSelectedOption , serviceType : serviceTypeSelectedOption.value },function () {})
        }
    }

    openserviceModal = () => {
        this.setState({openserviceModal: true});
    }

    closeserviceModal = () => {
        this.setState({openserviceModal : false});
        this.clearData();
    }

    closeserviceEditModal = () => {
        this.setState({openserviceEditModal : false});
        this.clearData();
    }

    clearData = () =>{
        this.setState({serviceName: '', serviceTypeSelectedOption:'', serviceType : '', serviceNameValid:true, inputArray:[], addserviceFormValid:true})
    }

    handleChange = (e) => {
        let data = new Object();
        data.id = e.target.id;
        data.value = e.target.value;
        this.setState({[data.id]: data.value});
        this.checkRequiredFields(data);
    }

    checkRequiredFields = (data) => {
        if(data.id === "serviceName"){
            const array = Functions.createInputArray(data,this.state.inputArray);
            this.setState({inputArray : array});
            const validationArray = Functions.validateFunction(this.state.inputArray);
            if(!validationArray){
                this.setState({addserviceFormValid : false});
            }
            else{
                for(var i=0 ; i<validationArray.length; i++){
                    const valid = [validationArray[i].id] + "Valid";
                    this.setState({[valid] : validationArray[i].isItValid});
                }
            }
        }
    }


    addservice = () => {
        const array = Functions.validateFunction(this.state.inputArray);
        const isItValid = Functions.checkFalseElements(array,1);
        if(isItValid == true){
            this.setState({addserviceFormValid : false});
        }
        else{
            this.setState({addserviceFormValid : true, btnDisable : true});
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = {
                "serviceType" : this.state.serviceName,
                "type" : this.state.serviceType,
            }
            const post = Functions.ajaxFunction("serviceType/add",headers, JSON.stringify(body),'POST');
            post.then((data) => data.json())
                .then((data) => {
                        this.setState({btnDisable : false});
                        if(data != null){
                            Functions.alertNotification("تم اضافة معلومات الخدمة بنجاح", "success");
                            this.closeserviceModal();
                            this.getAllservices();
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

    updateservice = () => {
        let data = new Object();
        data.id = "serviceName";
        data.value = this.state.serviceName;
        this.checkRequiredFields(data);
        const array = Functions.validateFunction(this.state.inputArray);
        const isItValid = Functions.checkFalseElements(array,1);
        let type = this.state.serviceTypeSelectedOption;
        if(type !== undefined || type !== null){
            type = type.value;
        }
        else{
            type = "";
        }
        if(isItValid == true){
            this.setState({addserviceFormValid : false});
        }
        else{
            this.setState({addserviceFormValid : true, btnDisable : true});
            const headers = {
                'Content-Type' : 'application/json',
                'X-AUTH-TOKEN' : Functions.getCookies("token")
            }
            const body = {
                "serviceType" : this.state.serviceName,
                "type" : type,
                "id" : this.state.id
            }
            const post = Functions.ajaxFunction("serviceType/update",headers, JSON.stringify(body),'PUT');
            post.then((data) => data)
                .then((data) => {
                        this.setState({btnDisable : false});
                        if(data.status == "200"){
                            Functions.alertNotification("تم تعديل معلومات الخدمة بنجاح", "success");
                            this.closeserviceEditModal();
                            this.getAllservices();
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

    openEditserviceModal = (serviceName,rId,serviceType) =>{
        let type = "";
        if(serviceType === "حجز فندق"){
            type = { value: 0, label: 'حجز فندق' }

        }
        if(serviceType === "سيارات"){
            type = { value: 1, label: 'سيارات' };
        }
        this.setState({openserviceEditModal: true,serviceName : serviceName , id:rId, serviceTypeSelectedOption : type});
    }

    onDeleteCloseModal = () => {
        this.setState({openDeleteserviceModal : false});
        this.getAllservices();
    }

    deleteservice = () => {
        this.setState({addserviceFormValid : true, btnDisable : true});
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = {
            "serviceType" : this.state.serviceName,
            "type" : this.state.serviceType,
            "id" : this.state.id
        }
        const post = Functions.ajaxFunction("serviceType/delete",headers, JSON.stringify(body),'DELETE');
        post.then((data) => data)
            .then((data) => {
                    this.setState({btnDisable : false});
                    if(data.status == "200"){
                        Functions.alertNotification("تم حذف معلومات الخدمة بنجاح", "error");
                        this.onDeleteCloseModal();
                        this.getAllservices();
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )

    }

    openDeleteserviceModal = (serviceName,rId,serviceType) =>{
        let type = "";
        if(serviceType === "حجز فندق"){
            type = 0

        }
        if(serviceType === "سيارات"){
            type = 1;
        }
        this.setState({openDeleteserviceModal: true,serviceName : serviceName , id:rId, serviceTypeSelectedOption : type});
    }

    render(){
        return(
            <div>
                <MenuPage/>
                <Service
                    newserviceModal = {this.openserviceModal}
                    openserviceModal = {this.state.openserviceModal}
                    closeserviceModal = {this.closeserviceModal}
                    openserviceEditModal = {this.openEditserviceModal}
                    closeserviceEditModal = {this.closeserviceEditModal}
                    onDeleteCloseModal = {this.onDeleteCloseModal}
                    openDeleteserviceModalStatus = {this.state.openDeleteserviceModal}
                    openDeleteserviceModal = {this.openDeleteserviceModal}
                    openserviceEditModalStatus = {this.state.openserviceEditModal}
                    handleChange = {this.handleChange}
                    serviceNameValid = {this.state.serviceNameValid}
                    addserviceFormValid = {this.state.addserviceFormValid}
                    btnDisable = {this.state.btnDisable}
                    addservice = {this.addservice}
                    updateservice = {this.updateservice}
                    deleteservice = {this.deleteservice}
                    services = {this.state.services}
                    serviceNameValue = {this.state.serviceName}
                    serviceTypeSelectedOption = {this.state.serviceTypeSelectedOption}
                    serviceTypeChangeHandler = {this.serviceTypeChangeHandler}
                />
            </div>
        )
    }
}
export default ServicePage;