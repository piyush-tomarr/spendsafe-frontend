import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
const token  = localStorage.getItem('token')
    if(!token){
       localStorage.removeItem('token')
       localStorage.removeItem('id')
       return <Navigate to='/login' replace/>    
    }

  return (
<Outlet/>
  )
}

export default Auth




// we are still left with JWT EXPIRY Logic here 