import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
const navigate = useNavigate();
  
  return (
    <section className=' bg-black text-white'>
      <div className='grid grid-rows-1 items-center lg:grid-cols-2'>
        {/* Left Section */}
        <div className='flex flex-col justify-start mt-15 md:mt-25 mx-5 px-5 md:px-10 h-fit py-14 bg-[#252525] opacity-90 rounded-3xl lg:ml-20 '>
          <h1 className='md:text-5xl text-3xl font-semibold'>
            Purebred Passion Starts Here — Welcome to <span className='text-primary'>SY TITAN.</span>
          </h1>
          <p className='my-6 text-[18px] md:text-xl font-normal'>
            Proudly raising healthy, well-socialized American Bully dogs with a focus on lineage, temperament, and lifelong companionship.
          </p>

          <div className='flex gap-5'>
            <div className="flex flex-col justify-start">
              <h1 className='text-2xl md:text-3xl font-semibold text-white'>6+</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p className='text-xs md:text-xl'>Years of Breeding Experience</p>
            </div>

            <div className="flex flex-col justify-start">
              <h1 className='text-2xl md:text-3xl  font-semibold text-white'>50+</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p className='text-xs md:text-xl'>Puppies Raised in Loving Homes</p>
            </div>

            <div className="flex flex-col justify-start">
              <h1 className='text-2xl md:text-3xl  font-semibold text-white'>100%</h1>
              <div className='my-2 w-16 h-[3px] bg-white'></div>
              <p className='text-xs md:text-xl'>Ethical & Health-Screened Lineage</p>
            </div>
          </div>

          <button onClick={()=> navigate('/lobby')} className=' cursor-pointer px-9 py-4 mt-6 max-w-[200px] rounded-[40px] bg-primary text-white hover:bg-primary/90 transition'>
            Explore Kennel
          </button>
        </div>

        {/* Right Section */}
        <div className='h-full w-full'>
          <img className='w-full h-full object-contain' src="/images/hero.png" alt="heropic" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
