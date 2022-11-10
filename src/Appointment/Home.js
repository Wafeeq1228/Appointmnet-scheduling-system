import React from 'react'
import './Home.css';
import { useNavigate,Redirect } from "react-router-dom";


const Home = () => {

 
  let navigate = useNavigate(); 
  var name = JSON.parse(sessionStorage.getItem('customer'));

 if(sessionStorage.getItem('customer')!==null){
  
  return (
    <div className='outerdivv'>
     
      
      <div className='outer-card'>
        <div className='card-1'><h2 onClick={()=>navigate('/Appointment')}>Book Appointment</h2></div>
        <div className='card-2'><h2 onClick={()=>navigate('/Rescheduling')}>Reschedule Appointment</h2></div>
        <div className='card-3'><h2 onClick={()=>navigate('/Cancellation')}>Cancel Appointment</h2></div>
      </div>
    </div>
  )
}
else{
  window.location="/";
}}

export default Home