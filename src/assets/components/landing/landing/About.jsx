import React from 'react'

const About = () => {
  return (
    <section className='bg-secondary'>
        <h1 className='text-5xl text-[#ECECEC] font-semibold text-center py-12'>ABOUT SY TITAN</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 ml-5 lg:ml-25">
            <div className="flex flex-col mt-8">
                <p className='text-2xl font-normal text-white'>SY TITAN is a dedicated breeding kennel based in Paradis Island, focused on producing exceptional American Bullies with strong lineage, stable temperaments, and striking appearance. Located in the quiet countryside of Japan, our dogs are raised in a clean, well-structured environment with early socialization and plenty of space to thrive. We believe in ethical breeding practices and connecting responsible owners with companions raised with care, purpose, and pride.</p>
                <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-6 cursor-pointer rounded-[40px] bg-primary text-white' >Explore Kernel </button>
            </div>
            <div>
                <img className='object-contain overflow-hidden' src="/images/aboutpic.png" alt="" />
            </div>

        </div>

    </section>
  )
}

export default About
