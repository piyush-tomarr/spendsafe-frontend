import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react';
import {baseURL} from '../APIs/Api'
import { toast } from "react-toastify";

const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [PassMessage, setPassMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const loginClicker = () => navigate("/login");

  const SignupHandeler = async(e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) return setPassMessage("Passwords don't match");
    const payload = { username: Username, email: Email, password: Password };
    try {
      const res =await axios.post(`${baseURL}/api/signin-users`, payload);

      console.log(`${baseURL}/api/signin-users`)
      console.log(res.status);

       const status = res.status
        console.log(status)
       if(status===200){
        toast.success("Otp Sent to your Email")



      navigate('/otp',{state:{username:Username,email:Email,password:Password}});

      let fiveMin = new Date().getTime() + 5*60000
      Cookies.set('email', Email, { expires: fiveMin });
       }
      

      
    } catch (err) {
      
    console.log(err)
    let errStatus = err.response.status
        console.log(err.response.data)
        toast.error(err.response.data.message)
       
     
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-gray-100">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-50 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-10 left-10 w-52 h-52 bg-red-100 rounded-full opacity-30 animate-blob animation-delay-4000"></div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 my-6">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-xl mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">Create Account</h1>
          <p className="text-gray-400 text-sm font-medium">Sign up to get started with your dashboard</p>
          <div className="flex justify-center gap-1.5 mt-4">
            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
            <span className="w-2 h-1 bg-green-500 rounded-full"></span>
            <span className="w-2 h-1 bg-red-400 rounded-full"></span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={SignupHandeler}>
          <div className="flex flex-col gap-4">

            {/* Username */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password + Confirm — side by side */}
            <div className="grid grid-cols-2 gap-3">

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-10 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Confirm</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={ConfirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (PassMessage) setPassMessage('');
                    }}
                    placeholder="Confirm"
                    required
                    className="w-full pl-10 pr-10 py-3 text-sm rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Error message */}
            {PassMessage && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {PassMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 tracking-wide"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-all"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            {/* Login link */}
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={loginClicker}
                className="text-green-600 font-bold cursor-pointer hover:text-green-700 hover:underline transition-colors"
              >
                Login
              </span>
            </p>

          </div>
        </form>

        {/* Bottom accent strip */}
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
  );
};

export default Signup;