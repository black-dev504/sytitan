import React from 'react'

const Hero = () => {
  return (
 <section className='px-10 lg:pr-0 lg:pl-25  bg-black text-white '>
    <div className='grid grid-rows-1 lg:grid-cols-2'>
        <div className='flex flex-col justify-start my-16 px-10 py-14 bg-[#252525] opacity-85 rounded-3xl'>
        <h1 className='text-5xl font-semibold '>Purebred Passion Starts Here — Welcome to <span className='text-primary'>SY TITAN.</span> </h1>
        <p className='my-6 text-xl font-normal'>Proudly raising healthy, well-socialized American Bully dogs with a focus on lineage, temperament, and lifelong companionship.</p>
        <div className='flex gap-12'>
            <div className="flex flex-col justify-start">
                <h1 className='text-3xl font-semibold text-white'>10+</h1>
                <div className='my-2 bg-white w-4/10 border-t-3 border-white'  > </div>
                <p>Breeding Experience</p>
            </div>

              <div className="flex flex-col justify-start">
                <h1 className='text-3xl font-semibold text-white'>60+</h1>
                <div className='my-2 bg-white w-4/10 border-t-3 border-white'  > </div>
                <p>Puppies Raised in Loving Homes</p>
            </div>

              <div className="flex flex-col justify-start">
                <h1 className='text-3xl font-semibold text-white'>100%</h1>
                <div className='my-2 bg-white w-4/10 border-t-3 border-white'  > </div>
                <p>Ethical & Health-Screened Lineage</p>
            </div>
        </div>
        <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-6 cursor-pointer rounded-[40px] bg-primary text-white' >Explore Kernel </button>

        </div>

          <div className=' h-full'>
            <img className='object-cover  h-full overflow-hidden' src="/images/heropic.png" alt="heropic" />
            </div>

    </div>

 </section>
  )
}

export default Hero
