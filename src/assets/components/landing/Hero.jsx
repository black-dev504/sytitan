import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
const navigate = useNavigate();
  
  return (
    <section className=' bg-black text-white'>
      <div className='grid grid-rows-1 lg:grid-cols-2'>
        {/* Left Section */}
        <div className='flex flex-col justify-start my-16 px-10 py-14 bg-[#252525] opacity-90 rounded-3xl lg:ml-20 '>
          <h1 className='text-5xl font-semibold'>
            Purebred Passion Starts Here — Welcome to <span className='text-primary'>SY TITAN.</span>
          </h1>
          <p className='my-6 text-xl font-normal'>
            Proudly raising healthy, well-socialized American Bully dogs with a focus on lineage, temperament, and lifelong companionship.
          </p>

          <div className='flex gap-12'>
            <div className="flex flex-col justify-start">
              <h1 className='text-3xl font-semibold text-white'>10+</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p>Breeding Experience</p>
            </div>

            <div className="flex flex-col justify-start">
              <h1 className='text-3xl font-semibold text-white'>60+</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p>Puppies Raised in Loving Homes</p>
            </div>

            <div className="flex flex-col justify-start">
              <h1 className='text-3xl font-semibold text-white'>100%</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p>Ethical & Health-Screened Lineage</p>
            </div>
          </div>

          <button onClick={()=> navigate('/lobby')} className='px-9 py-4 mt-6 max-w-[200px] rounded-[40px] bg-primary text-white hover:bg-primary/90 transition'>
            Explore Kennel
          </button>
        </div>

        {/* Right Section */}
        <div className='h-full w-full'>
          <img className='w-full h-full object-cover' src="/images/heropic.png" alt="heropic" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
