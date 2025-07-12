import Heading from "./Heading";


const About = ()=>{

    return (
        <section>

            <Heading image='/images/lobbypic.png' title='About us' />

          <div className="px-5 lg:px-20 bg-[#252525] py-12">

            <p className='text-2xl md:text-center font-normal text-white'>
                About us
                </p>
                
         </div>

        </section>


    )
}

export default About