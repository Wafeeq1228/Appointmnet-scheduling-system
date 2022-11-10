import React from 'react'

const Logout = () => {
    if(sessionStorage.getItem("customer")!=null)
        {
            sessionStorage.removeItem("customer");
            window.location="/";
        }
  return (
    <div>Logout</div>
  )
}

export default Logout