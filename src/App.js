
// import { useState } from 'react';
import './App.css';
import Login from './Customer/Login';
import SignUp from './Registeration/SignUp';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AppointmentSchedule from './Appointment/AppointmentSchedule';
import AppointmentCancel from './Appointment/AppointmentCancel';
import AppointmentReschedule from './Appointment/AppointmentReschedule';
import Home from './Appointment/Home';
import PageNotFound from './Appointment/PageNotFound';
import Navigationbar from './Appointment/Navigationbar';
import Logout from './Customer/Logout';
import Profile from './Customer/Profile';
import Navbarouter from './Registeration/Navbarouter';
import ForgotPassword from './Customer/ForgotPassword';
import History from './Appointment/History';



function App() {
  // const [issubmitted,setIsSubmitted] = useState(false);
  // const submitForm=()=>{
  //   setIsSubmitted(true);
  // }


  return (
    <>
    <div>
    {sessionStorage.getItem('customer')?<Navigationbar/>:<Navbarouter/>}
    </div>
    <div>
    <div className='item'>
    <BrowserRouter>
       
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Customer/Login' element={<SignUp/>} />
          <Route path='/Appointment' element={<AppointmentSchedule/>} />
          <Route path='/Cancellation' element={<AppointmentCancel/>} />
          <Route path='/Rescheduling' element={<AppointmentReschedule/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Logout' element={<Logout/>} />
          <Route path='/Profile' element={<Profile/>} />
          <Route path='/Forgotpassword' element= {<ForgotPassword/>} />
          <Route path='/History' element= {<History/>} />
          <Route path='*' element= {<PageNotFound/>} />
        </Routes>
    </BrowserRouter>
   
    
  </div>
  </div>
  </>
  )
}

export default App;
// {issubmitted ? <p>Login success</p> : <Login submitForm={submitForm} />}