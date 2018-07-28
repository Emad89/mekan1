import React from 'react';
import classes from './Login.css';
import logo from '../../img/logo_sticky.png';
import Notifications, {notify} from 'react-notify-toast';

const login = (props) => {

    const inputNotValid = classes.inputNotValid;

    return(
        <div className="limiter">
            <Notifications />
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={logo} alt="IMG"/>
                    </div>

                    <div className="login100-form validate-form">
                            <span className="login100-form-title">
                                تسجيل الدخول
                            </span>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input id="email" type="text" name="email" placeholder="البريد الالكتروني" onChange={props.handleChange}
                                   className={"input100 " + (props.emailValid === false ? inputNotValid : '')}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                            {props.emailValid === false ?
                                <small className="form-text text-muted errorMessage">
                                    الرجاء ادخال معلومات الايميل بالشكل الصحيح
                                </small> : ''
                            }
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input type="password" id="password" name="pass" placeholder="كلمة السر" onChange={props.handleChange}
                                   className={"input100 " + (props.passwordValid === false ? inputNotValid : '')}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
                            {props.passwordValid === false ?
                                <small className="form-text text-muted errorMessage">
                                    الرجاء ادخال كلمة السر بالشكل الصحيح
                                </small> : ''
                            }
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={props.submitLogin} disabled={props.btnDisable}>
                                تسجيل الدخول
                            </button>
                            {props.loginFormValid === false ?
                                <p style={{"color": "red", "textAlign": "center"}}>الرجاء ادخال الايميل و كلمة السر</p> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;