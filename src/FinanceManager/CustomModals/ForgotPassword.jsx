import React from 'react'
import { ArrowRightFromLine, DoorClosedLocked, LogOut } from 'lucide-react';

const ForgotPassword = ({handleForgotPasswordModal}) => {
  return (
    <>
    <div className='h-[100vh] w-full flex justify-center items-center bg-black/30 backdrop-blur-md z-50 absolute top-0 p-10' >
        <div className='h-[350px] w-[400px] bg-white shadow-md rounded-lg flex flex-col items-center gap-8 p-5'>
            <div className='flex items-center justify-center flex-col gap-2'>
                 <div className='h-auto w-auto bg-blue-500 rounded-lg p-4'>  <DoorClosedLocked  size={30} className='text-white'/></div>
                <div className=' flex justify-center items-center flex-col gap-2'>
                    <h1 className='font-semibold text-xl'>Forgot Password?</h1>
                    <div className='flex items-end gap-1.5'>
                        <span className='bg-blue-500 h-1 w-8 rounded-full'></span>
                        <span className='bg-green-500 h-1 w-4 rounded-full'></span>
                        <span className='bg-red-500 h-1 w-2 rounded-full'></span>
                    </div>
                </div>
            </div>
            <p className='text-center'>We will Send an OTP to your email . Enter the Correct OTP . Don't share the OTP with anyone.</p>
            <div className='flex gap-5'>
                 <button className=' px-4 py-2 bg-red-500 text-white font-semibold flex items-center gap-2 rounded-md' onClick={handleForgotPasswordModal}>exit <LogOut size={20}/> </button>
                 <button className='px-3 py-2 bg-blue-500 text-white font-semibold flex gap-2 items-center rounded-md'>Proceed  <ArrowRightFromLine size={20} /></button>
            </div>
         </div>
    </div>
    </>
  )
}

export default ForgotPassword