import axios from 'axios';
import React,{useEffect, useState} from 'react'
import './signup.css';
import SignupValidations from './SignupValidations';


export default function SignUp(){

  const [Form,setForm] = useState({
    name:'',
    email:'',
    dob:'',
    mobileNumber:'',
    gender:'',
    password:'',
    confirmPassword:''
  })

  const {name,email,dob,mobileNumber,password,confirmPassword} = Form;
  

  const [errors,setErrors] = useState({});
  const[isdatavalid,setIsDataValid] = useState(false);
  const [buttonClicked,setButtoclicked] = useState(false);

  const changeHandler = (e)=>{
    setForm({...Form,[e.target.name] : e.target.value})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(SignupValidations(Form));
    setButtoclicked(true);
  }
  useEffect(()=>{
    if(Object.keys(errors).length ===0 && buttonClicked){
      
      submit(true);
    }
},[errors]);

  const submit = (prop)=>{
   
    if(prop){
      
        axios.post('http://localhost:62443/insert',Form).then(Response=>{
          if(isNaN(Response.data)){
            alert('Email is already exist please login to continue')
          }
          else{
            alert('Registration Sucessfull with id '+Response.data+" please login to continue")
          }
        }).catch(Response=>{alert('something went wrong please  try again');console.log(Response)})
    }
  }

  


  return (
  
    <div className="container1">
      <div className="title">Registration</div>
        <div className="content">
          <form autoComplete='off' onSubmit={submitHandler}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" name='name' value={name} onChange={changeHandler} placeholder="Enter your name" />
                
                {errors.name ? <p style={{color:'red'}}>{errors.name}</p> : null}
              </div>
              <div className="input-box">
                <span className="details">Birth Date</span>
                <input type="date" name='dob' value={dob} onChange={changeHandler} placeholder="Enter your username" />
                {errors.dob ? <p style={{color:'red'}}>{errors.dob}</p> : null}
                
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" name='email' value={email} onChange={changeHandler} placeholder="Enter your email" />
                {errors.email ? <p style={{color:'red'}}>{errors.email}</p> : null}
                
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="tel" name='mobileNumber' value={mobileNumber} onChange={changeHandler} placeholder="Enter your number" />
                
                {errors.phone ? <p style={{color:'red'}}>{errors.phone}</p> : null}
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="password" name='password' value={password} onChange={changeHandler} placeholder="Enter your password" />
                {errors.password ? <p style={{color:'red'}}>{errors.password}</p> : null}
                
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="password" name='confirmPassword' value={confirmPassword} onChange={changeHandler} placeholder="Confirm your password" />
                {errors.conpassword ? <p style={{color:'red'}}>{errors.conpassword}</p> : null}
                
              </div>
            </div>
            <div className="gender-details">
              <input type="radio" name="gender" id="dot-1" value={'Male'} onChange={changeHandler}/>
              <input type="radio" name="gender" id="dot-2" value={'Female'} onChange={changeHandler}/>
              {/* <p>{gender}</p> */}
              
              
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
              {errors.gender ? <p style={{color:'red'}}>{errors.gender}</p> : null}
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register"/>
            </div>
          </form>
      </div>
    </div>
  
  )
}

