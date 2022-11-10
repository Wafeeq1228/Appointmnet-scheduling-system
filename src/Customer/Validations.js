const Validations = (values) => {

    let errors = {};

    if(!values.username){
        errors.username = 'Email is required'
    }
    else if(!/\S+@\S+\.\S+/.test(values.username)){
        errors.username = "Email is invalid"
    }
    if(!values.password){
        errors.password = 'Password is required'
    }
    else if(values.password.length < 8){
        errors.password = "Password must be more than 8 characters"
    }

  return errors;
}

export default Validations