import {useState, useEffect} from 'react'
import Dogcard from './Dogcard'
import {dogs as getDogs} from "../../../auth"

const Dogs = () => {
const [dogs,setDogs] = useState([])
   useEffect(() => {
              const fetchDogs = async () => {
              try {
                const response = await getDogs(null,6)
                
                setDogs(response.data.dogs)
              } catch (err) {
                console.error('Failed to fetch dogs:', err);
              }
            };
    
        fetchDogs();
      }, []);
  return (
  <section className=' bg-black justify-center flex flex-col items-center' >

        <h1 className='text-5xl text-[#ECECEC] font-semibold text-center py-12'>MEET THE BULLIES</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 px-5 lg:px-25 pt-8'>

          {dogs.map((dog,index)=>(
             <Dogcard name={dog.name} age={dog.age} color={dog.color} images={dog.images} serial_no={dog.serial_no} key={index}/>

          ))}
        </div>
      <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-8 cursor-pointer rounded-[40px] bg-primary text-white' >View more </button>

  </section>
  )
}

export default Dogs
