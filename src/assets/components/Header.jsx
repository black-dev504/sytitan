import React from 'react'

const Header = () => {



  return (
   <section className='px-5 py-4 text-white lg:px-25 bg-[#252525] '>
        <div className='flex items-center justify-between'>
            <img src="/icons/logo.svg" alt="logo" />

            <ul className='flex items-center gap-10 justify-between'>
                <li className='hover:underline hover:text-blue-500'><a href="/home"></a>Home</li>
                <li className='hover:underline hover:text-blue-500' ><a href="/about"></a>About us</li>
                <li className='hover:underline hover:text-blue-500'><a href="/program"></a>Our program</li>
                <li className='hover:underline hover:text-blue-500'><a href="/contact"></a>Our vision</li>
            </ul>

            <button  className='px-9 py-6 border-1 border-[#FFAC38] text-[#FFAC38] rounded-[40px] hover:bg-primary hover:text-white' > Contact us</button>

        </div>
   </section>
  )
}

export default Header
