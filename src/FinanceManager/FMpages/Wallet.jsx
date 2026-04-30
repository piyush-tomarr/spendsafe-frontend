import { IndianRupee, Wallet2} from 'lucide-react'
import React, { useContext } from 'react'
import { baseURL } from '../../APIs/Api'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import { WalletContext } from '../Contexts/WalletContext'
import { Budgetcontext } from '../Contexts/BudgetContext'
const Wallet = () => {
  
  const [budget, setBudget] = useState('')
  const [budgetTypeBtn, setbudgetTypeBtn] = useState(false)
  const [budgetType, setbudgetType] = useState()
  const [walletAmount, setwalletAmount] = useState()
  const [getWallet, setGetWallet] = useState([])
  const [getBudget, setgetBudget] = useState()
  const{wallet,handleGetWallet}=useContext(WalletContext)
  const {fetchBudget} = useContext(Budgetcontext)
  let userId = localStorage.getItem('id')






useEffect(() => {
 if(!budget){
   setbudgetTypeBtn(false)
 }
 else{
  setbudgetTypeBtn(true)
 }

}, [budget])




let handleAddWallet= async(e)=>{
  e.preventDefault()
  try{
    let Payload = {
      id:userId,
      amount:walletAmount
    }
    let res = await axios.post(`${baseURL}/wallet/add`,Payload)
   let status = res.status
   if(status===200){
    await handleGetWallet()
    toast.success(res.data.message)
    setwalletAmount('')
   }
  }
  catch(error){
  console.log("error status" , error.status)
  let status= error.status

  if(status===400){
    toast.error(error.response.data.message)
  }
  if(status===500){
    toast.error(error.response.data.message)
  }
  }
 }



 
 const handlesetBudget =async(e)=>{
     e.preventDefault()
    
    let Payload={
        user_id:parseInt(userId),
        budget:parseInt(budget),
        budget_type:budgetType
    }

   try{
           let res = await axios.post(`${baseURL}/budgetapi/budget`,Payload)
          if(res.status===200){
            fetchBudget()
            toast.success(res.data.message)
             setBudget('')
          }
          
   }
   catch(error){
     toast.error(error.response.data.message)
   }
 
 }






  return (
     <>
    <div className=' h-full w-full bg-gray-100 flex justify-center items-center gap-10 flex-wrap overflow-x-auto p-5 md:p-10 '>
        <div className='h-auto w-[400px] bg-white shadow-md p-5 rounded-xl flex flex-col gap-5 ' >
            <div className='flex flex-col justify-center items-center gap-2'> 
                 <div className='h-[45px] w-[45px] bg-blue-500 rounded-md text-white flex justify-center items-center'><Wallet2 size={30}/></div>
                  <h1 className='text-center text-black text-3xl font-semibold'>{wallet?"Update Wallet" : "Add Wallet"}</h1>
                  <p className='text-sm font-semibold text-gray-400'>Set the available Amount in your wallet </p>
                  <div className='flex items-center justify-center gap-0.5'>
                    <div className='h-1 w-6 bg-blue-500 rounded-full'></div>
                    <div className='h-1 w-2 bg-red-500 rounded-full'></div>
                    <div className='h-1 w-2 bg-green-500 rounded-full'></div>
                  </div>
            </div>
          <form action="" className='flex flex-col justify-center items-center gap-2' onSubmit={handleAddWallet}>
            <div className='bg-gray-100 rounded-md h-auto full items-center justify-center gap-2 flex item text-gray-400 p-2'><span><IndianRupee size={18}/></span> <input type="text" name="" id="" placeholder='Enter Amount' className='border-none outline-none bg-gray-100' value={walletAmount} onChange={(e)=>{setwalletAmount(e.target.value)}}/></div>
            <button className='bg-blue-500 px-4 py-1 rounded-md text-white font-semibold hover:bg-blue-600 ' type='submit'>{wallet?"Update Wallet" : "Add Wallet"}</button>
          </form>
        </div>
        


          <div className='h-auto w-[400px] bg-white shadow-md p-5 rounded-xl flex flex-col gap-5 ' >
            <div className='flex flex-col justify-center items-center gap-2'> 
                 <div className='h-[45px] w-[45px] bg-blue-500 rounded-md text-white flex justify-center items-center'><IndianRupee  size={30}/></div>
                  <h1 className='text-center text-black text-3xl font-semibold'>Set Budget</h1>
                  <p className='text-sm font-semibold text-gray-400'>Set your budget according to your environment </p>
                  <div className='flex items-center justify-center gap-0.5'>
                    <div className='h-1 w-6 bg-blue-500 rounded-full'></div>
                    <div className='h-1 w-2 bg-red-500 rounded-full'></div>
                    <div className='h-1 w-2 bg-green-500 rounded-full'></div>
                  </div>
            </div>
          <form action="" className='flex flex-col justify-center items-center gap-2 ' onSubmit={handlesetBudget}>
            <div className='bg-gray-100 rounded-md h-auto full items-center justify-center gap-2 flex item text-gray-400 p-2'><span><IndianRupee size={18}/></span> <input type="text" name="" id="" placeholder='Enter Amount' className='border-none outline-none bg-gray-100' value={budget} onChange={(e)=>{setBudget(e.target.value)}}/></div>

           {
            budgetTypeBtn &&(
               <div className='p-2'>
                <div className='flex gap-2'><input type="radio" name='budgetType' value='daily' onChange={(e)=>{ setbudgetType(e.target.value)}}/> <p>Daily</p> </div>
                <div className='flex gap-2'><input type="radio" name='budgetType' value='weekly' onChange={(e)=>{ setbudgetType(e.target.value)} }/> <p>Weekly</p> </div>
            </div>
            )

           }
            <button className='bg-blue-500 px-4 py-1 rounded-md text-white font-semibold hover:bg-blue-600 ' >Add Amount</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default Wallet