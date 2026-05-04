import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../APIs/Api";
import { ArrowLeftRight, IndianRupee } from "lucide-react";
import {toast} from 'react-toastify'
import { useContext } from "react";
import { WalletContext } from "../Contexts/WalletContext";
import BudgetContext, { Budgetcontext } from "../Contexts/BudgetContext";
const FMhome = () => {
  const [forecast, setforecast] = useState();

  const [transactionAmount, settransactionAmount] = useState('');
  const [transactionType, settransactionType] = useState('');
  const [transactionNote, settransactionNote] = useState('')
  const [transactionCategory, settransactionCategory] = useState('')
  const [budgetAlerts, setbudgetAlerts] = useState()
  const {handleGetWallet} = useContext(WalletContext)
  const {budgetType}=useContext(Budgetcontext)
  useEffect(() => {
    if(!transactionAmount){
      settransactionType("")
    }
  }, [transactionAmount]);

  let handleForecast = async () => {
    let userId = localStorage.getItem("id");
    try {
      let res = await axios.get(`${baseURL}/wallet/forecast/${userId}`);
      if (res.status === 200) {
        setforecast(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleTransactions=async(e)=>{
    e.preventDefault()
   let userId = localStorage.getItem('id')
   let requestId = crypto.randomUUID()

    let payload = {
  "transaction_type": transactionType,
  "amount": Number(transactionAmount),
  "request_id": requestId,
  "category": transactionCategory,
  "note": transactionNote
}


    try{
    let res = await axios.post(`${baseURL}/wallet/${userId}/transaction`,payload)
    console.log(res)
    if(res.status===200){
        settransactionAmount("")
    settransactionType("")
    settransactionCategory("")
    settransactionNote("")
    toast.success('Transaction Successful')
    }
    handleGetWallet()
    handleBudgetAlerts()
    }
    catch(error){
      
     toast.error('Error! Unable to Process your Transaction ar the moment')
     
    }
  }



  let formattedForecastDate = new Date(forecast?.runoutDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  useEffect(() => {
    handleForecast();
  }, []);

 const handleBudgetAlerts = async()=>{
  let userId= localStorage.getItem('id')
     try{
      let res = await axios.get(`${baseURL}/budgetapi/${userId}/${budgetType}/budget-alerts`)
      console.log(res.data.response)
      setbudgetAlerts(res.data.response)

     }
     catch(error){
       console.log('error ',error)
     }
 }

useEffect(() => {
  if (budgetType) {  
    handleBudgetAlerts()
  }
}, [budgetType])  


  return (
    <>
      <div className="h-auto w-full flex gap-2 justify-around flex-wrap">
        <div className="relative bg-white border border-gray-200 rounded-2xl pt-2 pb-5 px-10 overflow-hidden shadow-sm ">
          {/* Top-left corner div */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-red-500 rounded-br-2xl" />
          

          { !forecast ?<div className="h-[100%] w-[100%] flex items-center justify-center font-semibold text-red-500">
            <p>Please set up yout wallet before accessing this feature</p>
          </div>:  <div className="ml-5">
            <p className="text-md font-semibold tracking-wider uppercase text-gray-400 mb-2 font-arvo">
              Wallet Summary
            </p>
            <p className="text-[14px] leading-relaxed text-gray-700">
              At your current spending rate, your wallet will last{" "}
              <span className="text-green-500 font-semibold font-arvo">
                {forecast?.daysRemaining} days
              </span>{" "}
              and run out on{" "}
              <span className="text-red-500 font-semibold font-arvo">
                {formattedForecastDate ? formattedForecastDate : "--"}
              </span>
              .
            </p>
          </div> }
        
        </div>

        <div className="relative bg-white border border-gray-200 rounded-2xl pt-2 pb-5 px-10 overflow-hidden shadow-sm">
          {/* Top-left corner div */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-blue-500 rounded-br-2xl" />
             
          {/* Content */}

          {  !budgetAlerts ?  <div className="h-[100%] w-[100%] flex items-center justify-center font-semibold text-red-500 ">
            <p>Please set up yout wallet before accessing this feature</p>
          </div> : <div className="ml-5">
            <p className="text-sm  md:text-md font-semibold tracking-wider uppercase text-gray-400 mb-2 font-arvo flex  justify-between">
              <span>{budgetAlerts?.status}</span>  <span className="flex">Spent: <span className="text-sm text-black flex justify-center items-center"><IndianRupee size={14}/> {budgetAlerts?.spent}</span> </span>
            </p>
            <p className={`text-[14px] leading-relaxed font-semibold ${
  budgetAlerts?.status === 'Alert'   ? 'text-red-500' :
  budgetAlerts?.status === 'Warning' ? 'text-yellow-500' :
  budgetAlerts?.status === 'Relax'   ? 'text-green-500' :
  'text-gray-700'
}`}>
             {budgetAlerts?.message}
            </p>
          </div>}

      

        
        </div>
      </div>

      <div className=" w-full  flex justify-center items-center mt-5 bg-gray-100 p-2 ">
        <div className="bg-white w-fit p-5 flex flex-col items-center justify-center gap-3 rounded-md">
          <div className=" bg-blue-500 w-fit p-3 rounded-xl ">
            <ArrowLeftRight size={20} className="text-white" />
          </div>
          <h1 className="font-semibold text-2xl">Transactions</h1>
          <p>Enter your Transactions here to keep a record</p>
          <form
            action=""
            className=" flex flex-col gap-2 justify-center items-center"
            onSubmit={handleTransactions}
          >
            <div className="bg-gray-100 rounded-md h-auto full items-center justify-center gap-2 flex item text-gray-400 p-2">
              <span>
                <IndianRupee size={18} />
              </span>{" "}
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Amount"
                className="border-none outline-none bg-gray-100"
                value={transactionAmount}
                onChange={(e) => {
                  settransactionAmount(e.target.value);
                }}
              />
            </div>

            {transactionAmount && (
              <div className=" flex flex-col justify-center items-center gap-8">
                <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                  {/* Credit */}
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="transaction_type"
                      value="credit"
                      className="peer sr-only"
                      onChange={(e) => {
                        settransactionType(e.target.value);
                      }}
                    />
                    <span className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-green-500 transition-all duration-150 peer-checked:bg-white peer-checked:text-green-600 peer-checked:border peer-checked:border-green-600 peer-checked:font-semibold">
                      Credit
                    </span>
                  </label>

                  {/* Debit */}
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="transaction_type"
                      value="debit"
                      className="peer sr-only"
                      onChange={(e) => {
                        settransactionType(e.target.value);
                      }}
                    />
                    <span className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-red-500 transition-all duration-150 peer-checked:bg-white peer-checked:text-red-600 peer-checked:border peer-checked:border-red-600 peer-checked:font-semibold">
                      Debit
                    </span>
                  </label>
                </div>

               {transactionType==='credit' && (
                    <div className="flex flex-col justify-center items-center gap-2">
                  <textarea
                   required
                    placeholder="Enter reason... "
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none transition-all duration-150"
                    rows={3}
                    value={transactionNote}
                    onChange={(e)=>{settransactionNote(e.target.value)}}
                  />
                  <button className="px-4 py-1 bg-green-500 hover:bg-green-600 font-semibold text-white rounded-md" >Submit</button>
                </div>
               )}


               {transactionType==='debit' && (
                    <div className="flex justify-center items-center flex-col gap-2">
                   <h1 className="font-semibold text-sm">Please Select a category</h1>
                   <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                    
  {/* Non-negotiable */}
  <label className="relative cursor-pointer">
    <input required type="radio" name="transactionCategory" value="non-negotiable" className="peer sr-only" onChange={(e)=>{settransactionCategory(e.target.value)}}/>
    <span className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-green-500 transition-all duration-150 peer-checked:bg-white peer-checked:text-green-600 peer-checked:border peer-checked:border-green-600 peer-checked:font-semibold" >
      Non-negotiable
    </span>
  </label>

  {/* Important */}
  <label className="relative cursor-pointer">
    <input required type="radio" name="transactionCategory" value="important" className="peer sr-only" onChange={(e)=>{settransactionCategory(e.target.value)}}/>
    <span className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-blue-500 transition-all duration-150 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:border peer-checked:border-blue-600 peer-checked:font-semibold" >
      Important
    </span>
  </label>

  {/* Misc */}
  <label className="relative cursor-pointer">
    <input required type="radio" name="transactionCategory" value="misc" className="peer sr-only"  onChange={(e)=>{settransactionCategory(e.target.value)}}/>
    <span className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-red-500 transition-all duration-150 peer-checked:bg-white peer-checked:text-red-600 peer-checked:border peer-checked:border-red-600 peer-checked:font-semibold" >
      Misc
    </span>
  </label>
</div>

                  <textarea
                   required
                    placeholder="Enter reason... "
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none transition-all duration-150"
                    rows={3}
                    value={transactionNote}
                    onChange={(e)=>{settransactionNote(e.target.value)}}
                  />


                  <button className="px-4 py-1 bg-green-500 hover:bg-green-600 font-semibold text-white rounded-md" >Submit</button>
                </div>
               )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default FMhome;
