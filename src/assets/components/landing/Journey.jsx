import React from 'react'


const Journey = () => {
  return (
      <section className='bg-secondary'>
        <div className="grid grid-cols-1 lg:grid-cols-2 py-8 md:py-10 lg:py-15 gap-8 md:gap-12 lg:gap-20 md:ml-5 lg:ml-25 items-center">

          {/* Text Content */}
          <div className="flex items-center lg:items-start px-5 text-center lg:text-start flex-col">
            <h1 className='text-5xl text-[#ECECEC] font-semibold py-6 md:py-8 lg:py-12'>Our Journey</h1>
            <p className='text-xl md:text-2xl font-normal text-white'>
              SY TITAN started in Nigeria with a simple goal: to raise American Bullies that stand out — not just in looks, but in strength, stability, and heart. What began as a passion grew into a purpose — building bloodlines rooted in quality and care. Over time, our commitment attracted dog lovers from beyond our borders, and today we proudly ship internationally, connecting families across the world with Bullies raised in Africa, bred with love, and built with pride. Every dog that leaves our kennel carries a piece of our story — a journey of purpose, discipline, and dedication.            </p>
            <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-6 cursor-pointer rounded-[40px] bg-primary text-white'>
              Explore Kernel
            </button>
          </div>

          {/* Image Grid */}
          <div className='overflow-y-visible flex flex-col lg:my-8'>
            <div className='grid grid-cols-2 items-baseline mb-4 gap-4'>
              <img src='/images/journeypic1.jpeg' alt="" />
              <img src='/images/journeypic2.jpeg' alt="" />
            </div>
            <div className='grid grid-cols-[55%_45%] gap-4'>
              <img src='/images/journeypic3.jpeg' alt="" />
              <img src='/images/journeypic4.jpeg' alt="" />
            </div>
          </div>

        </div>
      </section>

  )
}

export default Journey
