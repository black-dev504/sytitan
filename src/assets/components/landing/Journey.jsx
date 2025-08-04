import React from 'react'

const Journey = () => {
  return (
      <section className='bg-secondary'>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-5 lg:ml-25 min-h-screen lg:min-h-0">

          {/* Text Content */}
          <div className="flex justify-center lg:justify-start items-center lg:items-start text-center lg:text-start flex-col py-8 lg:py-20">
            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-[#ECECEC] font-semibold mb-4 lg:mb-8'>Our Journey</h1>
            <p className='text-lg sm:text-xl lg:text-2xl font-normal text-white mb-6 max-w-full'>
              SY TITAN started in Nigeria with a simple goal: to raise American Bullies that stand out — not just in looks, but in strength, stability, and heart. What began as a passion grew into a purpose — building bloodlines rooted in quality and care. Over time, our commitment attracted dog lovers from beyond our borders, and today we proudly ship internationally, connecting families across the world with Bullies raised in Africa, bred with love, and built with pride. Every dog that leaves our kennel carries a piece of our story — a journey of purpose, discipline, and dedication.
            </p>
            <button className='px-9 py-6 hover:border-1 max-w-[200px] cursor-pointer rounded-[40px] bg-primary text-white'>
              Explore Kernel
            </button>
          </div>

          {/* Image Grid */}
          <div className='flex flex-col justify-center p-4 lg:p-8'>
            <div className='grid grid-cols-2 mb-2 lg:mb-4 gap-2 lg:gap-4'>
              <img src='/images/journeypic1.jpeg' alt="" className='w-full h-auto object-cover' />
              <img src='/images/journeypic2.jpeg' alt="" className='w-full h-auto object-cover' />
            </div>
            <div className='grid grid-cols-[55%_45%] gap-2 lg:gap-4'>
              <img src='/images/journeypic3.jpeg' alt="" className='w-full h-auto object-cover' />
              <img src='/images/journeypic4.jpeg' alt="" className='w-full h-auto object-cover' />
            </div>
          </div>

        </div>
      </section>

  )
}

export default Journey
