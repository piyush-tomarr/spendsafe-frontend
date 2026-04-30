import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookeis from 'js-cookie'
import { baseURL } from "../APIs/Api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
const Otp = () => {

//Hooks

  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [otp, setotp] = useState(["","","",""])
  const [resendButtonActive, setResendButtonActive] = useState(false)
  const [timer, settimer] = useState(60)
  let intervalRef = useRef(null)
  let location = useLocation()
  let{username,email,password}=location.state



//functions


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
     let newOtp=[...otp]
     newOtp[index] = value,
     setotp(newOtp)
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  
 const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
const handleVarify=async()=>{
   const stringOTP=otp.join("")
  console.log(otp.join(""))
  const Email  = Cookeis.get('email')
  const payload = {
    email: Email,
    otp:stringOTP
  }
   try{
           const res =await axios.post(`${baseURL}/api/otp-varify`,payload)
          
           console.log(res.status)

          let status = res.status

          if(status === 200){
            toast.success("Varification Successful")

            navigate('/login')
                Cookies.remove('email')
          }

         

   }
   catch(err){
             console.log(err,'error occured, unable to varify otp')
             toast.error(err.response.data.message)
   }
}



//SideEffects

useEffect(() => {
  
  let email = Cookies.get('email')
  if(!email){
    navigate('/signup') 
  }

}, [])


useEffect(() => {
  intervalRef.current= setInterval(()=>{
    settimer(prev=>{
      if(prev<=1){
        clearInterval(intervalRef.current)
        setResendButtonActive(true)
        return 0
      }
      return prev-1
    })
  },1000)


  return()=> clearInterval(intervalRef.current)

}, [timer])

 let HandleReset = async ()=>{
      let payload = {
        username,
        email,
        password
      }
       setResendButtonActive(false)
       settimer(60)
      
try{
  let response = await axios.post(`${baseURL}/api/resend-otp`,payload)
 
  if(response.status===200){
    toast.success("OTP sent Successfully")
  }
  
}
catch(error){
  toast.error('Something went Wrong! Try Sign-in Again')
}

 }




  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 animate-gradient"></div>

        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-purple-300/60 rounded-full blur-3xl mix-blend-multiply animate-blob-slow"></div>
        <div className="absolute top-10 -right-24 w-[380px] h-[380px] bg-pink-300/60 rounded-full blur-3xl mix-blend-multiply animate-blob-medium"></div>
        <div className="absolute -bottom-24 left-1/3 w-[420px] h-[420px] bg-blue-300/60 rounded-full blur-3xl mix-blend-multiply animate-blob-fast"></div>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30">

        <div className="text-center mb-6 flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold bg-black bg-clip-text text-transparent">
            Verify OTP
          </h1>
         
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Enter the 4-digit code sent to you
          </p>
           <div className=" flex items-center justify-center gap-1">
            <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
            <div className="h-1 w-2 bg-green-500 rounded-full"></div>
            <div className="h-1 w-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* 4-DIGIT OTP */}
        <div className="flex justify-center gap-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              value={otp[index]}

              
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              onChange={(e) =>{ handleChange(e, index) ; }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all bg-white/60"
            />
          ))}
        </div>

        <button onClick={handleVarify} className="w-full py-3 rounded-xl  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
          Verify OTP
        </button>


        {resendButtonActive ?(<p className="text-xs sm:text-sm text-center mt-4 text-gray-600">
          Click Here to to resend the OTP {" "}
          <span className="font-bold cursor-pointer text-transparent bg-blue-500 hover:bg-blue-600 active:bg-blue-700 bg-clip-text hover:underline" onClick={HandleReset} >
            Resend
          </span>
        </p>): (<p className="text-xs sm:text-sm text-center mt-4 text-gray-600">
          Resend OTP in {" "}
          <span className="font-bold cursor-pointer text-transparent bg-black bg-clip-text hover:underline" >
           {timer}s
          </span>
        </p>) }

        <p
          onClick={() => navigate("/")}
          className="text-xs sm:text-sm text-center mt-2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          Back to Sign-up
        </p>
      </div>

      {/* Animations */}
      <style >{`
        @keyframes gradientShift {
          50% { transform: scale(1.05) translate(-2%, -2%); }
        }
        .animate-gradient {
          animation: gradientShift 25s ease-in-out infinite;
        }
        @keyframes blobSlow { 50% { transform: translate(60px, -40px) scale(1.15); } }
        @keyframes blobMedium { 50% { transform: translate(-50px, 30px) scale(1.1); } }
        @keyframes blobFast { 50% { transform: translate(40px, -60px) scale(1.2); } }

        .animate-blob-slow { animation: blobSlow 22s ease-in-out infinite; }
        .animate-blob-medium { animation: blobMedium 18s ease-in-out infinite; }
        .animate-blob-fast { animation: blobFast 14s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Otp;
