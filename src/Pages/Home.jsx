// import React from 'react'
// import axios from 'axios'
// import { Navigate, replace, useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import { Wallet, CalendarCheck } from "lucide-react";
// import { baseURL } from '../APIs/Api';
// const Home = () => {
// const navigate = useNavigate()


// const AuthUser = async()=>{
  
// try{
//            const token  = localStorage.getItem('token')
//   const res =await axios.get(`${baseURL}/api/me`,{
//     headers:{
//       Authorization: `Bearer ${token}`
//     }
//   })
//   console.log(res.data)
// }
// catch(err){
//    if(err.response.status ===401){
//     localStorage.removeItem('token')
//     localStorage.removeItem('id')
//     navigate('/login',{replace:true})
//    }
// }

// }
// useEffect(() => {
// AuthUser()
// }, [])
//   return (
    
//         <>
//                   <div className="min-h-screen w-full bg-slate-50 flex justify-center items-center px-4">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col items-center gap-10 py-12">

//         <h1 className="text-4xl font-semibold text-slate-800 tracking-wide">
//           Choose Service
//         </h1>

//         <div className="w-full flex flex-wrap justify-center items-center gap-12 px-6">

//           {/* Finance Manager */}
//           <div
//             className="h-[380px] w-[360px] rounded-2xl border border-blue-100
//                        bg-gradient-to-br from-blue-50 to-blue-100
//                        flex flex-col items-center justify-center gap-5
//                        cursor-pointer transition-all duration-300
//                        hover:scale-105 hover:shadow-xl" onClick={()=>{navigate('/FMmain')}}
//           >
//             <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center" >
//               <Wallet className="text-white h-8 w-8" />
//             </div>

//             <h2 className="text-2xl font-semibold text-slate-800">
//               Finance Manager
//             </h2>

//             <p className="text-slate-600 text-center px-8 leading-relaxed">
//               Track expenses, manage budgets and gain control over your finances.
//             </p>

//             <button
//               className="mt-4 px-6 py-2 rounded-full
//                          bg-blue-500 text-white font-medium
//                          hover:bg-blue-600 transition"
//             >
//               Get Started
//             </button>
//           </div>

//           {/* Habit Manager */}
//           <div
//             className="h-[380px] w-[360px] rounded-2xl border border-green-100
//                        bg-gradient-to-br from-green-50 to-green-100
//                        flex flex-col items-center justify-center gap-5
//                        cursor-pointer transition-all duration-300
//                        hover:scale-105 hover:shadow-xl"
//           >
//             <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center" >
//               <CalendarCheck className="text-white h-8 w-8" />
//             </div>

//             <h2 className="text-2xl font-semibold text-slate-800">
//               Habit Manager
//             </h2>

//             <p className="text-slate-600 text-center px-8 leading-relaxed">
//               Build consistency, track habits, and improve daily productivity.
//             </p>

//             <button
//               className="mt-4 px-6 py-2 rounded-full
//                          bg-green-500 text-white font-medium
//                          hover:bg-green-600 transition"
//             >
//               Get Started
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>      
//         </>

//   )
// }

// export default Home









import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Wallet, LogOut } from "lucide-react";
import { baseURL } from '../APIs/Api';

const Home = () => {
  const navigate = useNavigate()

  const AuthUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${baseURL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data)
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        navigate('/login', { replace: true })
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    AuthUser()
  }, [])

  return (
    <>
      <div className="min-h-screen w-full bg-slate-50 flex justify-center items-center px-4 py-4 ">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex flex-col items-center gap-10 md:py-12 py-16 px-8 ">

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full
                       bg-red-50 text-red-500 border border-red-200 font-medium text-sm
                       hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          <h1 className="text-4xl font-semibold text-slate-800 tracking-wide">
            Getting Started
          </h1>

          <div className="w-full flex flex-wrap justify-center items-stretch gap-10">

            {/* Finance Manager Card */}
            <div
              className="h-[380px] w-[320px] rounded-2xl border border-blue-100
                         bg-gradient-to-br from-blue-50 to-blue-100
                         flex flex-col items-center justify-center gap-5
                         cursor-pointer transition-all duration-300
                         hover:scale-105 hover:shadow-xl"
              onClick={() => { navigate('/FMmain') }}
            >
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                <Wallet className="text-white h-8 w-8" />
              </div>

              <h2 className="text-2xl font-semibold text-slate-800">
                SpendSafe
              </h2>

              <p className="text-slate-600 text-center px-8 leading-relaxed">
                Track expenses, manage budgets and gain control over your finances.
              </p>

              <button
                className="mt-4 px-6 py-2 rounded-full
                           bg-blue-500 text-white font-medium
                           hover:bg-blue-600 transition"
              >
                Get Started
              </button>
            </div>

            {/* About SpendSafe */}
            <div className="w-[360px] flex flex-col justify-center gap-4 px-2">
              <h2 className="text-2xl font-semibold text-slate-800">
                About SpendSafe
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                SpendSafe is a practical expense manager built to help you stay in control of your finances.
                It allows you to manage your wallet, track credits and debits, and categorize your expenses
                for better clarity. The app gives you better visibility into miscellaneous expenses, helping
                you identify hidden or unplanned spending. With detailed transaction history and structured
                categories, you can clearly understand your spending patterns. It also provides smart insights,
                such as estimating how long your current balance will last based on your recent spending
                behavior, enabling more informed financial decisions.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home