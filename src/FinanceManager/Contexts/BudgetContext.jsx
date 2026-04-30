import React, { Children, createContext, useEffect,useState } from 'react'
import { baseURL } from '../../APIs/Api'
import axios from 'axios'

export const Budgetcontext = createContext()


const BudgetContext = ({children}) => {
 const [getBudget, setgetBudget] = useState()

 const fetchBudget = async()=>{
  let userId = localStorage.getItem('id')
  try{
   let res = await axios.get(`${baseURL}/budgetapi/budget?user_id=${userId}`)
   
   if(res.status===200){
    setgetBudget(res.data.result)
   }
  }
  catch(error){
  console.log(error)
  }
 }
useEffect(() => {
 fetchBudget()
},[] )


  return (
   <Budgetcontext.Provider value={{getBudget,fetchBudget}}>
    {children}
   </Budgetcontext.Provider>
  )
}

export default BudgetContext

