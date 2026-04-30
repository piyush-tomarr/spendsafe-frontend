import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../APIs/Api'

const FMhome = () => {
   
  const [forecast, setforecast] = useState()
  
   let handleForecast = async()=>{
    let userId = localStorage.getItem('id')
      try{
            let res = await axios.get(`${baseURL}/wallet/forecast/${userId}`)
       if(res.status===200){
        setforecast(res.data.data)
        
       }
      }
      catch(error){
        console.log(error)
      }
   }

   let formattedForecastDate = new Date(forecast?.runoutDate).toLocaleDateString('en-US',{
    year:'numeric',
    month:'long',
    day:'numeric'
   })

   useEffect(() => {
    handleForecast()
   }, [])
   
   useEffect(() => {
    console.log(forecast)

    console.log('formatted date' , formattedForecastDate)
   }, [forecast])
   

  return (
    <>
      <div className='h-auto w-fit'>
        <div className='relative bg-white border border-gray-200 rounded-2xl pt-2 pb-5 px-6 overflow-hidden shadow-sm'>

          {/* Top-left corner div */}
          <div className='absolute top-0 left-0 w-10 h-10 bg-red-500 rounded-br-2xl' />

          {/* Content */}
          <div className='ml-5'>
            <p className='text-md font-semibold tracking-wider uppercase text-gray-400 mb-2 font-arvo'>
              Wallet Summary
            </p>
            <p className='text-[14px] leading-relaxed text-gray-700'>
              At your current spending rate, your wallet will last{' '}
              <span className='text-green-500 font-semibold font-arvo'>{forecast?.daysRemaining} days</span>{' '}
              and run out on{' '}
              <span className='text-red-500 font-semibold font-arvo'>{formattedForecastDate?formattedForecastDate : '--'}</span>.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default FMhome