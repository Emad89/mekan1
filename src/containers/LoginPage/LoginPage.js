import React,{Component} from 'react';
import Login from '../../components/Login/Login';
import Functions from '../../helper/Functions'
import BaseConfig from '../../BaseConfig';

class LoginPage extends Component{
    state = {
        email : '',
        password : '',
        emailValid : '',
        passwordValid : '',
        loginFormValid : true,
        inputArray : [],
        btnDisable: false
    }

    login = () => {
        const array = Functions.validateFunction(this.state.inputArray);
        const isItValid = Functions.checkFalseElements(array,2);
        if(isItValid == true){
            this.setState({loginFormValid : false});
        }
        else{
            this.setState({loginFormValid : true, btnDisable : true});
            const headers = {'Content-Type': 'application/json'}
            const body = {
                "username" : this.state.email,
                "password" : this.state.password,
            }
            const Post = Functions.ajaxFunction("auth/admin",headers, JSON.stringify(body),'POST');
            Post.then((data) => data.json())
                .then((data) => {
                        if(data.msgCode === 403){
                            window.location.href =BaseConfig.frontEndUrl;
                        }
                        if(data.status === 401){
                            Functions.alertNotification("الرجاء ادخال معلومات الدخول بالشكل الصحيح","error")
                            window.location.href =BaseConfig.frontEndUrl;
                        }
                        if(data.token != null){
                            if(data.status === 401){
                                Functions.alertNotification("الرجاء ادخال معلومات الدخول بالشكل الصحيح","error")
                            }
                            Functions.setCookies("token",data.token);
                            Functions.setCookies("role",data.role);
                            window.location.href = "/home";
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log("an error has happened while you tried to login " + err);
                    }
                )
        }
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

    render()
    {
        return(
            <div>
                <Login
                submitLogin = {this.login}
                handleChange = {this.handleChange}
                passwordValid = {this.state.passwordValid}
                emailValid = {this.state.emailValid}
                loginFormValid = {this.state.loginFormValid}
                btnDisable = {this.state.btnDisable}
                />
            </div>
        )
    }
}
export default LoginPage;