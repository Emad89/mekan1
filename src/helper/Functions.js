import BaseConfig from "../BaseConfig";
import cookies from "js-cookies";
import  {notify} from 'react-notify-toast';

const Functions = {

ajaxFunction : function(baseUrl,header,body,method) {
    const url = BaseConfig.baseUrl + baseUrl;
    return fetch(url, {
        method: method,
        body: body,
        headers: header
    })
},

createInputArray : function (e,array) {
    let found = false;
    let foundIndex = -1;
    const len = array.length;
    if(len != 0){
        for(var i = 0; i < len; i++) {
            const currentInput = array[i];
            if (currentInput.id[0] == [e.id]) {
                found = true;
                foundIndex = i;
            }
        }
    }
    if(found == true){
        var requestedInput = array[foundIndex];
        requestedInput.value = [e.value];
    }
    else{
        array.push({
            id : [e.id],
            value : [e.value]
        });
    }
    return array;
},

validateFunction : function (array) {
    if(array.length != 0){
        let validationArray = [];
        for(var i=0; i<array.length; i++){
            let isItValid = false;
            if(array[i].id[0] == "email"){
                if (array[i].value.toString().indexOf("@") !== -1 && array[i].value.toString().indexOf(".") !== -1 &&
                    array[i].value.toString() !== "" && array[i].value.toString().length < 45) {
                    isItValid = true;
                }
                else {
                    isItValid : false;
                }
            }
            if(array[i].id[0] == "password"){
                if (array[i].value.toString().length > 5) {
                    isItValid = true;
                }
                else {
                    isItValid : false;
                }
            }
            if(array[i].id[0] === "firstName" || array[i].id[0] === "lastName"  || array[i].id[0] === "nationality" || array[i].id[0] === "serviceName"){
                if (array[i].value.toString().length > 1) {
                    isItValid = true;
                }
                else {
                    isItValid : false;
                }
            }
            validationArray.push({
                id : [array[i].id[0]],
                isItValid : isItValid
            })
        }
        return validationArray;
    }
},

checkFalseElements : function (array,numberOfElementsToCheck) {
    let found = false;
    if(array != undefined){
        for(var i =0 ; i<array.length;i++){
            if(array[i].isItValid == false){
                found = true;
                break;
            }
        }
        if(numberOfElementsToCheck != array.length){
            found = true;
        }
    }
    else{
        found = true;
    }
    return found;
},

setCookies : function (name,value) {
    cookies.removeItem(name);
    cookies.setItem(name,value);
},

getCookies : function (name) {
    var token = "";
    if(cookies.getItem(name) != null){
        token =  cookies.getItem(name);
    }
    return token;
},

removeCookies : function (name) {
    cookies.removeItem(name);
},

alertNotification(text,state){
    notify.show(text,state);
},

}

export default Functions;