import React, { useEffect, useState } from 'react'
import Navbar from '../FMcomponents/Navbar'
import Sidebar from '../FMcomponents/Sidebar'
import { Outlet } from 'react-router-dom'
import { WalletContext } from '../Contexts/WalletContext'
import axios from 'axios'
import { baseURL } from '../../APIs/Api'
import BudgetContext from '../Contexts/BudgetContext'
const FinanceManagerMain = () => {

  const [wallet, setWallet] = useState(null)

   let userId = localStorage.getItem('id')

   let handleGetWallet = async()=>{
    try {
      const res = await axios.get(`${baseURL}/wallet/mywallet`, { params: { user_id: userId } });
      if (res.status === 200){
         setWallet(res.data.data)
         
       }
    } catch (error){
      console.log(error)
    }
  
}

useEffect(() => {
  handleGetWallet()
}, [])

 
  return (
<>
   <BudgetContext>
    <WalletContext.Provider value={{wallet,setWallet ,handleGetWallet}} >
   <div className='h-screen w-screen overflow-hidden flex flex-col'>
      <Navbar />  {/* natural flow, no absolute */}

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto bg-gray-100 p-4'>
          <div className='bg-white rounded-2xl shadow-xl min-h-full p-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
   </WalletContext.Provider>
   </BudgetContext>
   </>
  )
}

export default FinanceManagerMain