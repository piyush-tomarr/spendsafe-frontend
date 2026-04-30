import React from "react";
import {X} from 'lucide-react'
import axios from "axios";
import { useState } from "react";
const AddBudgetModal = ({handleUpdateModal,getWallet,walletModalname}) => {
  const [amount, setAmount] = useState('')
  const user_id=localStorage.getItem('id')

  
  const updateWalletHandeler= async(e)=>{
     e.preventDefault()
     console.log(user_id)
     console.log(amount)
     
     try{
           const res =await axios.post('http://localhost:2003/wallet/wallet/add',
            {
                 id:user_id,
                 amount:amount
           }
          )
          setAmount()
          handleUpdateModal()
           getWallet()
     }
     catch(error){
         console.log("error while Updating Wallet" , error)
     }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[360px] rounded-lg bg-white p-6 shadow-xl relative">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {walletModalname}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={updateWalletHandeler}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Total Wallet Amount
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e)=>{
                setAmount(e.target.value)
              }}
              placeholder="Enter amount"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-md bg-green-500 py-2 text-sm font-medium text-white transition hover:bg-green-600 active:scale-[0.98]"
          >
            + {walletModalname}
          </button>
        </form>
        <div id="clodeModal" className="h-5 w-5  absolute top-1 right-1"><button onClick={handleUpdateModal}><X size={20}/></button> </div>
      </div>
      
    </div>
  );
};

export default AddBudgetModal;
