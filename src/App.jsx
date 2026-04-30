import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Otp from './Pages/Otp'
import Home from './Pages/Home'
import Auth from './Auth/Auth'
import FinanceManagerMain from './FinanceManager/FMpages/FinanceManagerMain'
import Test from './FinanceManager/FMcomponents/Test'
import FMhome from './FinanceManager/FMpages/FMhome'
import Stats from './FinanceManager/FMpages/Stats'
import Expances from './FinanceManager/FMpages/Expances'
import Wallet from './FinanceManager/FMpages/Wallet'
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
      <>
      <Routes>
       

        // main Home Page
         <Route path='/' element={<Home/>}/>

        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/otp' element={<Otp/>} />

          {/* protected Routes */}
         <Route element={<Auth/>} >
         
         

         // Finance Manager Routes
          <Route path='/FMmain' element={<FinanceManagerMain/>}>
                  <Route path='home' element={<FMhome/>} />
                  <Route path='expances' element={<Expances/>} />
                  <Route path='wallet' element={<Wallet/>} />
                  <Route path='stats' element={<Stats/>} />
           
          </Route>
         
        </Route>


      </Routes>
      <ToastContainer position='top-right' />
      </>
  )
}

export default App