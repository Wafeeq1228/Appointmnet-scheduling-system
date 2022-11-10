import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';
const validations=(password,confirmPassword,currentpassword)=>{
  let errors = {};
  if(!password){
    errors.password = 'Password is required'
}
else if(password.length < 8){
    errors.password = "Password must be more than 8 characters"
}
if(confirmPassword!==password){
    errors.conpassword='Password not matching'
}
if(!currentpassword){
  errors.currentpassword='password required'
}
else if(currentpassword.length < 8){
  errors.currentpassword='mimimum 8 characters required'
}
return errors;
}

const Profile = () => {

    const [changepassword, setChangepassword] = useState(false);// option for change password
    const [newpassword,setnewPassword] = useState(''); // new password 
    const [currentpassword,setCurrentpassword] = useState(''); // current password
    const [confirmpassword,setConfirmPassword] = useState(''); // confirm password
    const [errors,setErrors] = useState({}); // to store validation errors
    const [buttonclicked,setButton] = useState(false); // to check weather the button clicked or not
    let name = JSON.parse(sessionStorage.getItem('customer')); // extracting customer id from session storage
    const [msg,setMsg] = useState('');

    const submitHandler=(event)=>{
      event.preventDefault();
      setErrors(validations(newpassword,confirmpassword,currentpassword));
      setButton(true);
    }
    useEffect(()=>{
      if(Object.keys(errors).length === 0 && buttonclicked){
        //http://localhost:62443/api/Customer/changepassword?id=17&currentpassword=12345678&newpassword=1234567890
        axios.get('http://localhost:62443/api/Customer/changepassword?id='+name.id+'&currentpassword='+currentpassword+'&newpassword='+newpassword).then(res=>{
          if(res.data === 1){
            
            setMsg('Password changed successfully')
          }
          else{setMsg('Incorrect password')}
        }).catch(res=>console.log(res));
      }
      
    },[errors])

  if(sessionStorage.getItem('customer') !== null){

    var user = JSON.parse(sessionStorage.getItem('customer'));
    return (
        <div className='profile'>
          <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Mobile number: {user.mobileNumber}</p>
              <p>Date of Birth: {user.dob}</p>
              <p>Gender: {user.gender}</p>
              <button type="button"   class="btn btn-success" onClick={()=>setChangepassword(true)  }>Change password</button>
              {/* <p onClick={()=>setChangepassword(true)}>change password</p>  */}
          </div>
          <div>
          {!changepassword ?null:
          <form onSubmit={submitHandler}>
            <input type='password' placeholder='Current Password' value={currentpassword} onChange={(e)=>setCurrentpassword(e.target.value)}/>
            <p>{errors.currentpassword}</p>
            <input type='password' placeholder='New Password' value={newpassword} onChange={(e)=>setnewPassword(e.target.value)}/>
            <p>{errors.password}</p>
            <input type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <p>{errors.conpassword}</p>
            <p>{msg}</p>
            <input type='submit' value='Change Password'/>
          </form>
          }
          </div>
        </div>
        
      )
  }
  else{
    window.location='/';
  }
}

export default Profile