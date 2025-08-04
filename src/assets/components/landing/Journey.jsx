import React from 'react'

const Journey = () => {
  return (
      <section className='bg-secondary'>
        <div className="grid grid-cols-1 lg:grid-cols-2 py-4 md:py-8 lg:py-15 gap-4 md:gap-8 lg:gap-20 md:ml-5 lg:ml-25 items-center">

          {/* Text Content */}
          <div className="flex items-center lg:items-start px-5 text-center lg:text-start flex-col">
            <h1 className='text-4xl md:text-5xl text-[#ECECEC] font-semibold py-4 md:py-6 lg:py-12'>Our Journey</h1>
            <p className='text-xl md:text-2xl font-normal text-white'>
              SY TITAN is a dedicated breeding kennel based in Paradis Island, focused on producing exceptional American Bullies with strong lineage, stable temperaments, and striking appearance. Located in the quiet countryside of Japan, our dogs are raised in a clean, well-structured environment with early socialization and plenty of space to thrive. We believe in ethical breeding practices and connecting responsible owners with companions raised with care, purpose, and pride.
            </p>
            <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-6 cursor-pointer rounded-[40px] bg-primary text-white'>
              Explore Kernel
            </button>
          </div>

          {/* Image Grid */}
          <div className='overflow-y-visible flex flex-col lg:my-4'>
            <div className='grid grid-cols-2 items-baseline mb-2 md:mb-4 gap-2 md:gap-4'>
              <img src='/images/journeypic1.jpeg' alt="" />
              <img src='/images/journeypic2.jpeg' alt="" />
            </div>
            <div className='grid grid-cols-[55%_45%] gap-2 md:gap-4'>
              <img src='/images/journeypic3.jpeg' alt="" />
              <img src='/images/journeypic4.jpeg' alt="" />
            </div>
          </div>

        </div>
      </section>

  )
}
export default Journey
