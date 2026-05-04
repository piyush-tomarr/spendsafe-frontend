import React, { Children, createContext, useEffect,useState } from 'react'
import { baseURL } from '../../APIs/Api'
import axios from 'axios'

export const Budgetcontext = createContext()


const BudgetContext = ({children}) => {
 const [getBudget, setgetBudget] = useState()
const [budgetType, setbudgetType] = useState()
 const fetchBudget = async()=>{
  let userId = localStorage.getItem('id')
  try{
   let res = await axios.get(`${baseURL}/budgetapi/budget?user_id=${userId}`)
   
   if(res.status===200){
    setgetBudget(res.data.result)
    setbudgetType(res.data.result.budget_type)
    console.log(res.data.result.budget_type)
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
   <Budgetcontext.Provider value={{getBudget,budgetType,fetchBudget}}>
    {children}
   </Budgetcontext.Provider>
  )
}

export default BudgetContext

