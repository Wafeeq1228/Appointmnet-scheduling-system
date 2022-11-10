import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cancel.css'
import moment from 'moment/moment';

const AppointmentCancel = () => {

  const [history,setHistory] = useState([]);
  const [bookingId,setBookingid] = useState();
  //const url = 'http://localhost:62443/api/Appointment?Id=56'; // cancel
  // http://localhost:62443/History/active?id=13 // history
  let name = JSON.parse(sessionStorage.getItem('customer'));
  useEffect(()=>{
    axios.get('http://localhost:62443/History/active?id='+name.id).then(Response=>setHistory(Response.data)).catch(Response=>console.log(Response))},[]
  )
  useEffect(()=>{
  axios.get('http://localhost:62443/History/active?id='+name.id).then(Response=>setHistory(Response.data)).catch(Response=>console.log(Response))},[history])
  const onClickHandler=()=>{
    axios.get('http://localhost:62443/api/Appointment?Id='+bookingId).then(Response=>alert('Booking having id '+Response.data+' is cancelled')).catch(Response=>alert('something went wrong'));
  }

  if(sessionStorage.getItem('customer') !== null){
    return (
      <div class="container">
            <h1>Cancel Order</h1>
       <table className="rwd-table">
        <tbody>
          <tr>
            <th >Booking Id</th>
            <th >Date</th>
            <th >Slot Time</th>
            <th >Status</th>
            <th >Cancel</th>
          </tr>
        
       
          {history.map(item => (
            <tr onClick={()=>setBookingid(item.id)}>
              <th scope="row">{item.id}</th>
              <td>{moment(item.bookDate).format('DD-MMM-YYYY')}</td>
              <td>{moment(item.startTime).format('hh-mm A')}</td>
              <td>{item.bookstatus}</td>
              <button onClick={onClickHandler}>Cancel</button>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
  }
  else{
    window.location="/";
  }
}

export default AppointmentCancel