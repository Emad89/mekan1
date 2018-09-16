import React , {Component} from 'react';
import MenuPage from "../MenuPage/MenuPage";
import PieChart from 'react-minimal-pie-chart';
import Functions from "../../helper/Functions";

class HomePage extends Component{

    state={
        bookings:'',
        sure : 0,
        notSure : 0,
        cancelled : 0,
    }

    componentDidMount = () => {
        this.getAllBookings();
    }

    getAllBookings = () => {
        const headers = {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : Functions.getCookies("token")
        }
        const body = null;
        const get = Functions.ajaxFunction("booking/all",headers, body,'GET');
        get.then((data) => data.json())
            .then((data) => {
                    if(data != null){
                        this.setState({bookings : data});
                        if(data){
                            let cancelled = 0;
                            let sure = 0;
                            let notSure = 0;
                            for(var i =0 ; i<data.length;i++){
                                if(data[i].bookingState === 0 ){
                                    sure++;
                                }
                                else if(data[i].bookingState === 1){
                                    notSure++;
                                }
                                else if(data[i].bookingState === 2){
                                    cancelled++;
                                }
                            }
                            this.setState({sure:sure,notSure:notSure,cancelled:cancelled});
                        }
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }


    render()
    {
        return(
            <div>
                <MenuPage/>
                <div className="col-sm-12">
                    <div className="col-sm-6">
                        <div style={{width:"60%",display:"inline-block"}}>
                            <PieChart
                                data={[
                                    { title: 'مؤكد', value: this.state.sure, color: '#ffff00' },
                                    { title: 'غير مؤكد', value: this.state.notSure, color: 'rgb(33, 150, 243)' },
                                    { title: 'ملفي', value: this.state.cancelled, color: 'red' },
                                ]}
                                animate
                            />
                        </div>
                    </div>
                    <div className="col-sm-6" style={{textAlign:"right"}}>
                        <h1 style={{marginBottom:"40px"}}>:المخطط البياني لحالة الحجوزات</h1>
                        <div style={{display:"block",marginTop:"15px"}}>
                            <h3 style={{display:"inline-block",marginRight:"10px"}}>عدد الحجوزات المؤكدة:   {this.state.sure}</h3>
                            <div style={{
                                width: "20px",
                                height: "20px",
                                display: "inline-block",
                                backgroundColor: "#ffff00",
                                borderRadius: "50%",

                            }}>
                            </div>
                        </div>
                        <div style={{display:"block",marginTop:"15px"}}>
                            <h3 style={{display:"inline-block",marginRight:"10px"}}>  عدد الحجوزات الغير مؤكدة:{this.state.notSure}</h3>
                            <div style={{
                                width: "20px",
                                height: "20px",
                                display: "inline-block",
                                backgroundColor: "rgb(33, 150, 243)",
                                borderRadius: "50%",

                            }}>
                            </div>
                        </div>
                        <div style={{display:"block",marginTop:"15px",marginBottom:"40px"}}>
                            <h3 style={{display:"inline-block",marginRight:"10px"}}>عدد الحجوزات الملغية: {this.state.sure}</h3>
                            <div style={{
                                width: "20px",
                                height: "20px",
                                display: "inline-block",
                                backgroundColor: "red",
                                borderRadius: "50%",

                            }}>
                            </div>
                        </div>
                        <h2>عدد الحجوزات الكلي: {this.state.notSure + this.state.sure + this.state.cancelled}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomePage;