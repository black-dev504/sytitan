import React from 'react'

const Dogcard = (props) => {
  return (
    <div className='rounded-4xl max-w-[479px] flex flex-col  bg-[#252525]'>
        <div className=' w-full h-8/10'>
        <img src={props.img} className='object-contain w-full rounded-t-4xl overflow-hidden' alt="" />
        </div>

        <div className='flex flex-col pl-3 py-6'>
            <h2 className='my-2 font-bold text-[#ECECEC] text-[20px] '><span className='text-white'>{props.name}</span></h2>
            <p className='text-[#FFAC38] text-[16px] font-bold'>Age: <span className='text-white'>{props.age}</span></p>
            <p className='text-[#FFAC38] text-[16px] font-bold'>Status: <span className='text-white'>{props.status}</span> </p>
        </div>

         <button className=' cursor-pointer border-1 ml-3 max-w-[170px] text-[20px] font-medium hover:bg-primary hover:text-white border-[#FFAC38] text-[#FFAC38] rounded-[40px] mb-5 py-4 px-5'>Open Profile</button>
      
    </div>
  )
}

export default Dogcard
