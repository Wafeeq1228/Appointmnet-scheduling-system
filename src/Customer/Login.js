import React, { useEffect, useState } from 'react'
import Validations from './Validations';
import './loginform.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {

    const [data,setData]= useState({
        username:'',
        password:''
    })
    
    let navigate = useNavigate();
    const{username,password} = data;

    const[errors, setErrors] = useState({});
    // const[isvalid,setIsvalid] = useState(false);
    const[isdatavalid,setIsDataValid] = useState(false);
    
    const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        setErrors(Validations(data)); 
        setIsDataValid(true); 
    }
    const [customer,setCustomer] = useState({
      "name": "",
      "id": '',
      "email": "",
      "mobileNumber":'',
      "dob": "",
      "gender": ""
    });

    useEffect(()=>{
        if(Object.keys(errors).length ===0 && isdatavalid){
          
          submitForm(true);
        }
    },[errors]);

    const submitForm =(check)=>{
      if(check){
        axios.get('http://localhost:62443/api/Customer/login',{params: {
          eMail: username,password:password
        }}).then(Response=>{if(Response.data.name!=null)
          {
         // alert(response.data.username);
         console.log(Response.data)
          sessionStorage.setItem("customer",JSON.stringify(Response.data));
          window.location="/Home";}}).catch(e=>setLogin('Incorrect email or password'))
      }
    }
    const [loginerror,setLogin]=useState();
    

  return (
    <div className="wrapper">
      <div className="title">Login Form</div>
      <form onSubmit={submitHandler}>
        <p style={{color:'red'}}>{loginerror}</p>
        <div className="field">
          <input type="text" name='username' value={username} onChange={changeHandler}/>
          <label>Email Address</label>
        </div>
        {errors.username ? <p style={{color:'red'}}>{errors.username}</p> : null }
        <div className="field">
          <input type="password" name='password' value={password} onChange={changeHandler}/>
          <label>Password</label>
        </div>
        {errors.password ? <p style={{color:'red'}}>{errors.password}</p> : null }
        <div className="content">
          {/* <div className="checkbox">
            <input type="checkbox" id="remember-me"/>
            {errors.password ? <p>{errors.password}</p> : null }<br/>
            <label for="remember-me">Remember me</label>
          </div> */}
          <div className="pass-link"><a href="/Forgotpassword">Forgot password?</a></div>
        </div>
        <div className="field">
          <input type="submit" value="Login"/>
        </div>
        <div className="signup-link">Not a member? <a className="signup-link" onClick={()=>navigate('/Customer/Login')}>Signup now</a></div>
      </form>
    </div>
  )
}
