import React, {useState} from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './forgotpassword.css';

const ForgotPassword = () => {

  const [password,setPassword] = useState('');
  const [error,setError] = useState();
  const [success,setSuccess] = useState(false);
  const passwordRecovery = () =>{
    axios.get('http://localhost:62443/api/Customer/forgotpassword?email='+email).then(res=>setPassword(res.data)).catch(res=>console.log(res));
  }

  const [email,setEmail]=useState('');

  
  const sendEmail = (e)=>{
    e.preventDefault();
    passwordRecovery();
    if(password !==''){
    console.log('hi')
    emailjs.send('service_3v4r16j','template_myvlb2p',{
      Subject: "Password Recovery",
      from_name: 'ASS Team-2',
      to_name: 'Customer',
      message: password,
      reply_to: email,
  },'-5nmqJP76myNtB_gk').then(result=>{
    console.log(result.text)},error=>{console.log(error.text)})
    setError('Mail send successfully');
    setSuccess(true);
  }
  else{
  setError('You dont have account please register')
  }
 }


  return (
    <div className="container h-100">
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Reset password</h1>
							<p className="lead" style={{color:'white'}}>
								Enter your email to reset your password.
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<form onSubmit={sendEmail}>
										<div className="form-group">
											<label>Email</label>
											
                      <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" required={true} onChange={(e)=>setEmail(e.target.value)}/>
                      {success ? <p style={{color:'green'}}>{error}</p>:<p style={{color:'red'}}>{error}</p>}
                    </div>
										<div className="text-center mt-3">
											<input type='submit' value='Reset password' className="btn btn-lg btn-primary"/>
											
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
  )
}

export default ForgotPassword