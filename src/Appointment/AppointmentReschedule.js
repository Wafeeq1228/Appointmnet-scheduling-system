import React,{useState,useEffect} from 'react'

import axios from 'axios';
import moment from 'moment/moment';

import './Reschedule.css';

const AppointmentReschedule = () => {
  const [bookDetails,setBookdetails] = useState({
    bookDate:'',
    startTime:'',
    endTime:'',
    status:'booked'
  })
  const today = moment().format('YYYY-MM-DD[T]HH:mm:ss');
  const [error,setError]=useState();
  const slotTimes = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
  const [history,setHistory] = useState([]);
  const [click,setClicked] = useState('');
  let name = JSON.parse(sessionStorage.getItem('customer'));
  useEffect(()=>{
    axios.get('http://localhost:62443/History/active?id='+name.id).then(Response=>setHistory(Response.data)).catch(Response=>console.log(Response))},[]
  )
  useEffect(()=>{
  axios.get('http://localhost:62443/History/active?id='+name.id).then(Response=>setHistory(Response.data)).catch(Response=>console.log(Response))},[history])
  
  const dateOnChange =(e)=>{
    setBookdetails({...bookDetails,[e.target.name] : e.target.value})
  }

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
    axios.patch('http://localhost:62443/api/Appointment/'+click,obj).then(e=>{
      alert('Successfully Rescheduled '+e.data)
      }
    ).catch(e=>alert('Something went wrong please try again'))}
  }
  useEffect(()=>{if(moment(bookDetails.bookDate+ bookDetails.startTime,'YYYY/MM/DDLT').format('YYYY-MM-DD[T]HH:mm:ss') > today){setError('')}else{setError('Please select another date')}},[bookDetails.bookDate,bookDetails.startTime])



  if(sessionStorage.getItem('customer') !== null){
    return (

      <div class="container2">
            <h1>Reschedule Booking</h1>
       <table className="rwd-table">
        <tbody>
          <tr >
            <th scope="col">Booking Id</th>
            <th scope="col">Date</th>
            <th scope="col">Slot Time</th>
            <th scope="col">Status</th>
          </tr>
        
        
          {history.map(item => (
            <tr onClick={()=>setClicked(item.id)} key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{moment(item.bookDate).format('DD-MMM-YYYY')}</td>
              <td>{moment(item.startTime).format('hh-mm A')}</td>
              <td>{item.bookstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      {!click?null:
      <form className='res'>
        <div className='res'>
      <div className='card'>
        <label>Select Date</label>
            <input type='date' name='bookDate' value={bookDetails.bookDate} onChange={dateOnChange}/>
            
            <br/><label>Select Slot</label>
            <select name = 'startTime' value = {bookDetails.startTime} onChange={dateOnChange}>
            {slotTimes.map((optn,index) => (
                      <option key={index}>{optn}</option>
                  ))}
            </select>
            {!error?null:<p style={{color:'red'}}>{error}</p>}
            <div>
            <input type='button' value='Submit' className='btn btn-primary' onClick={clickHandler}/>
            </div>
            </div>
      </div>
      </form>
      }
      </div>
      
    )
  }
  else{
    window.location="/";
  }
}


export default AppointmentReschedule