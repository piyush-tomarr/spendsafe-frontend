import React, { useState } from "react";
import { X } from "lucide-react";
import { baseURL } from "../../APIs/Api";
import axios from "axios";
const BudgetModal = ({modalName,closeModal}) => {


  const [amount, setamount] = useState('')
  const [budgetType, setbudgetType] = useState('daily')
  
const submitHandeler= async(e)=>{
  
  e.preventDefault()

  const userId = localStorage.getItem('id')
  console.log(amount,budgetType , userId)

   try{
        const response = await axios.post(`${baseURL}/budgetapi/budget`,{
          user_id:userId,
          budget:amount,
          budget_type:budgetType
        })

        console.log(response)
   }
   catch(error){
      console.log(error,'some error occured', error.response.data.msg)
   }


  setamount('')
 
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[360px] rounded-lg bg-white p-6 shadow-xl relative">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {modalName}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={submitHandeler}>
          
          {/* Amount Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Budget Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e)=>{setamount(e.target.value)}}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Budget Type Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Budget Type
            </label>

            <select
            value={budgetType}
            onChange={(e)=>{setbudgetType(e.target.value)}}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className="mt-2 rounded-md bg-green-500 py-2 text-sm font-medium text-white transition hover:bg-green-600 active:scale-[0.98]"
          >
           {modalName}
          </button>

        </form>

        {/* Close Button */}
        <div className="absolute top-1 right-1" onClick={closeModal}>
          <button>
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;