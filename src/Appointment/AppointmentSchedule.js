import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './Book.css';

const AppointmentSchedule = () => {

  const [bookDetails,setBookdetails] = useState({
    bookDate:'',
    startTime:'',
    endTime:'',
    status:'booked'
  })
  const today = moment().format('YYYY-MM-DD[T]HH:mm:ss');

  
  var name = JSON.parse(sessionStorage.getItem('customer'));
  const [staffId,setStaffid] = useState();
  const [courtId,setCourtid] = useState();

  const slotTimes = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
  const [courts,setCourts] = useState([]);
  const [staff,setStaff] = useState([]);
  useEffect(()=>{axios.get('http://localhost:62443/api/Court').then(response=>setCourts(response.data)).catch(e=>alert(e))},[]);
  useEffect(()=>{axios.get('http://localhost:62443/api/Staff').then(response=>setStaff(response.data)).catch(e=>alert(e))},[]);
  
  const [error,setError]=useState();
  const courtHandler = (e)=>{
    setCourtid(e.target.value)
  }
  const staffhandler = (e) =>[
    setStaffid(e.target.value)
  ]
  const dateOnChange =(e)=>{
    setBookdetails({...bookDetails,[e.target.name] : e.target.value})
  }

  // http://localhost:62443/api/Appointment/26/6/A
  const clickHandler = () =>{
    if(moment(bookDetails.bookDate+ bookDetails.startTime,'YYYY/MM/DDLT').format('YYYY-MM-DD[T]HH:mm:ss') > today){
      
      var obj = {
        id:0,
        bookDate:bookDetails.bookDate,
        "startTime": moment(bookDetails.bookDate+ bookDetails.startTime,'YYYY/MM/DDLT').format('YYYY-MM-DD[T]HH:mm:ss'),
        "endTime": moment(bookDetails.bookDate+ bookDetails.startTime,'YYYY/MM/DDLT').add(1,'hours').format('YYYY-MM-DD[T]HH:mm:ss'),
        bookstatus:'Booked'
    }
    }
    // else{
    //   setError('Please select another date')
    // }
    if(error === ''){
    axios.post('http://localhost:62443/api/Appointment/'+name.id+'/'+staffId+'/'+courtId, obj).then(e=>{
      if(isNaN(e.data)){
        alert('Slot is not available please choose another slot')
      }
      else{
        alert('Booking successfull with id '+e.data)
      }
    }).catch(e=>alert('Something went wrong please try again'))}
  }
  useEffect(()=>{if(moment(bookDetails.bookDate+ bookDetails.startTime,'YYYY/MM/DDLT').format('YYYY-MM-DD[T]HH:mm:ss') > today){setError('')}else{setError('Please select another date')}},[bookDetails.bookDate,bookDetails.startTime])

  if(sessionStorage.getItem('customer') !==null){  
  return (
    <div className='bgimg book-container'>
    <Container className='d-flex flex-column mb-3'>
             <div className='title'>Book Slot</div>
             <div className='book d-flex flex-column mb-3'>
            <label>Select Date</label>
            <input type='date' name='bookDate' value={bookDetails.bookDate} defaultValue={bookDetails.bookDate[1]} onChange={dateOnChange}/>
            
            <label>Select Slot</label>
            <select name = 'startTime' value = {bookDetails.startTime} defaultValue={bookDetails.startTime[1]} onChange={dateOnChange}>
            {slotTimes.map((optn,index) => (
                      <option key={index}>{optn}</option>
                  ))}
            </select>
            
            <label>Select Court</label>
            <select name = 'courtId' placeholder="Select a game" onChange={courtHandler}>
            {courts.map((optn) => (
                      <option key={optn.id} value={optn.id}>{optn.courtName}</option>
                  ))}
            </select>
            <label>Select Mentor</label>
            <select name = 'staffId' onChange={staffhandler}>
            {staff.map((optn) => (
                      <option key={optn.id} value={optn.id}>{optn.name}</option>
                  ))}
            </select>
            {!error?null:<p style={{color:'red'}}>{error}</p>}
              
            <div className='button'>
            <input type='button' value='Submit' className ='btn' onClick={clickHandler}/>
            </div>
            </div>
    </Container>
    </div>
  )
}

else{
  window.location="/";
}}
export default AppointmentSchedule