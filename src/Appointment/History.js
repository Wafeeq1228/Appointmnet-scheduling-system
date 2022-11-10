import React,{useEffect,useState}from 'react'
import moment from 'moment';
import axios from 'axios';
import './Tablehistory.css';

const History = () => {

    const [history,setHistory] = useState([]);
    let name = JSON.parse(sessionStorage.getItem('customer'));
    useEffect(()=>{
        //http://localhost:62443/History?Num=26
        axios.get('http://localhost:62443/History?Num='+name.id).then(Response=>setHistory(Response.data)).catch(Response=>console.log(Response))},[]
      )
      if(sessionStorage.getItem('customer') !== null){
        return (
          <div class="container">
            <h1>Order History</h1>
            <table className="rwd-table">
              <tbody>
                <tr>
                  <th >Booking Id</th>
                  <th >Date</th>
                  <th >Slot Time</th>
                  <th >Status</th>
                </tr>
              
                {history.map(item => (
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{moment(item.bookDate).format('DD-MMM-YYYY')}</td>
                    <td>{moment(item.startTime).format('hh-mm A')}</td>
                    {item.bookstatus==='BOOKED'?<td style={{color:'green'}}>{item.bookstatus}</td>:<td style={{color:'red'}}>{item.bookstatus}</td>}
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

export default History