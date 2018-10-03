import React , {Component} from 'react';
import Menu from '../../components/Menu/Menu';
import BookingDetails from '../../components/BookingDetails/BookingDetails';
import MenuPage from '../MenuPage/MenuPage';
import BookingJson from '../../helper/bookingDetail.json';

class BookingDetailsPage extends Component{

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
        var langText = BookingJson[0];
        // console.log("heyy mn bookings"+langText.firstName);
        console.log("heyy mn bookings"+langText.id);
    }


    render(){
        return(
            <div>
                <MenuPage/>
                <BookingDetails/>
            </div>
        )
    }
}
export default BookingDetailsPage;