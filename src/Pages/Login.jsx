import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ForgotPassword from "../FinanceManager/CustomModals/ForgotPassword";
import { toast } from "react-toastify";
import {baseURL} from '../APIs/Api'
import { Eye, EyeOff, Lock } from "lucide-react";


const Login = () => {


  const navigate = useNavigate()
  const SinupClicker = () => {
    navigate('/signup')
  }
  const [uid, setuid] = useState('')
  const [password, setpassword] = useState('')
  const [forgotPasswordModal, setforgotPasswordModal] = useState(false)
  const [viewPasword, setviewPasword] = useState(false)
  const handleForgotPasswordModal =()=>{
    setforgotPasswordModal(!forgotPasswordModal)
  }
  const handleLogin = async (e) => {
    const payload = {
      uid: uid,
      password: password
    }
    e.preventDefault()
    try {
      const res = await axios.post(`${baseURL}/api/login`, payload)
      console.log(res.data.id)
      const token = res.data.token
      const id = res.data.id
      console.log(res.data.response)
      localStorage.setItem('token', token)
      localStorage.setItem('id', id)
      if (res.status === 200) {
        navigate('/')
        toast.success('Login Successful')
      } else {
        toast.error("problem While redirecting")
      }
    } catch (error) {
      
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden bg-gray-100 ">

      {/* Background geometric shapes matching navbar's clean white+blue palette */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large soft blue blob top-right */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-50 animate-blob"></div>
        {/* Green accent blob bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
        {/* Subtle red accent top-left */}
        <div className="absolute top-10 left-10 w-52 h-52 bg-red-100 rounded-full opacity-30 animate-blob animation-delay-4000"></div>
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Card — mirrors Navbar's white shadow-xl rounded-xl */}
      <div className="relative w-full max-w-md mx-4 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

        {/* Header */}
        <div className="text-center mb-8">
          {/* Icon block matching navbar's blue button style */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-xl mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm font-medium">Sign in to continue to your dashboard</p>

          {/* Decorative accent bar */}
          <div className="flex justify-center gap-1.5 mt-4">
            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
            <span className="w-2 h-1 bg-green-500 rounded-full"></span>
            <span className="w-2 h-1 bg-red-400 rounded-full"></span>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">

          {/* Email / Username */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={uid}
                onChange={(e) => { setuid(e.target.value) }}
                placeholder="Enter email or username"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                {/* <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg> */}
                 <Lock size={14} className="text-gray-400"/>
              </div>
              <input
                type={viewPasword ? 'text':'password'}
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
              />
              <div className="   absolute inset-y-0 right-0 flex justify-center items-center pr-3">
               <button onClick={()=>{setviewPasword(!viewPasword)}}> {viewPasword ? <EyeOff size={18} className="text-gray-400"/>:   <Eye size={18} className="text-gray-400"/> }</button>
              </div>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-end text-sm">
            
            <span className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 hover:underline transition-colors"
            onClick={handleForgotPasswordModal}>
              Forgot password?
            </span>
          </div>

          {/* Login Button — matches navbar's blue button style */}
          <button
            type="button"
            onClick={handleLogin}
            className="mt-1 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 tracking-wide"
          >
            Login
          </button>

          {/* Divider with color accents */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="flex justify-center">
                        <button
                          type="button"
                          className="flex items-center gap-2 border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-all"
                        >
                          <FcGoogle size={20} /> Continue with Google
                        </button>
                      </div>
          {/* Sign Up link */}
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={SinupClicker}
              className="text-green-600 font-bold cursor-pointer hover:text-green-700 hover:underline transition-colors"
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Bottom accent strip — mirrors navbar's three button colors */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl flex overflow-hidden">
          <div className="flex-1 bg-blue-500"></div>
          <div className="flex-1 bg-green-500"></div>
          <div className="flex-1 bg-red-500"></div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(20px, -30px) scale(1.05); }
          66%  { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 9s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
    {forgotPasswordModal && ( <ForgotPassword handleForgotPasswordModal={handleForgotPasswordModal}/>)}
    
    </>
  );
};

export default Login;