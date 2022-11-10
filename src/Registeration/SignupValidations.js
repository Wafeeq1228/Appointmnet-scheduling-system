

const SignupValidations = (values) => {
    let errors = {};
    if(!values.email){
        errors.email = 'Email is required'
    }
    else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }
    if(!values.name){
        errors.name = 'Enter name'
    }
    if(!values.dob){
        errors.dob='Enter Birth Date'
    }
    else if(values.dob >= Date.now){
        errors.dob = 'Enter valid date'
    }
    if(!values.gender){
        errors.gender = "Select gender"
    }
    if(!values.password){
        errors.password = 'Password is required'
    }
    else if(values.password.length < 8){
        errors.password = "Password must be more than 8 characters"
    }
    if(values.confirmPassword!==values.password){
        errors.conpassword='Password not matching'
    }
    if(!values.mobileNumber){
        
        errors.phone = "Enter phone number"
    }
    
    return errors;
}

export default SignupValidations