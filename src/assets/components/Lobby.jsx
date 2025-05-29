import {useState,useEffect} from 'react';
import Dogcard from './landing/Dogcard';
import { getDogs as dogData } from '../../auth';

const Lobby = () => {
    const data = ['ALL', 'STUDS', 'BITCHES', 'PUPPIES', 'UPCOMING']
    const [signal, setSignal] = useState('ALL')
    const [dogs, setDogs] = useState({})
    const [error, setError] = useState('')

    
      useEffect(() => {
          const fetchDogs = async () => {
          try {
            const response = await dogData('all')
            setDogs(response.data.dog);
          } catch (err) {
            console.error('Failed to fetch dogs:', err);
          } finally {
            setLoading(false);
          }
        };

    fetchDogs();
  }, []);

    const handleClick = async(filter)=>{
        setSignal(filter)
        try{
          const response = await dogData(filter)
          setDogs( response.data.dog)
          console.log(dogs);
          
        }
        catch(err){
          const errmssg = err?.response.data?.error || 'failed'
          setError(errmssg)
          console.log(error);
          
        }

    }

  return (


    <section>
      <div className="relative h-96 w-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/lobbypic.png"
          alt="Lobby background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <h1 className='text-5xl relative text-[#ECECEC] font-semibold text-center py-12'>MEET THE BULLIES</h1>
     
      </div>

      <div className="px-5 lg:px-20 bg-[#252525] py-12">
        <div className="filters flex overflow-x-auto  gap-6">
           {data.map((filter,index)=>(
                <Filterbutton text={filter} 
                 key={index}
                 onClick={()=> handleClick(filter)}
                 isSelected={filter===signal}  />
           ))}
        </div>
 
      </div>

       <section className=' bg-black justify-center flex flex-col items-center' >

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-5 lg:px-20 py-8'>

          {dogs.length>0?dogs.map((data,index)=>(
             <Dogcard name={data.name} age={data.age} status={data.status} images={data.images} serial_no={data.serial_no} key={index}/>

          )):(error?error:<h1 className='text-white font-bold text-3xl'>No dogs available for this filter</h1>)}
        </div>
      {/* <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-8 cursor-pointer rounded-[40px] bg-primary text-white' >View more </button> */}

  </section>
    </section>
  );
};

const Filterbutton = ({text, isSelected, onClick})=>{


    return (
        <button onClick={onClick} className={`py-5 px-9 cursor-pointer text-[#FFAC38] rounded-[40px]  ${isSelected?' bg-[#FFAC38] text-white':'border-2 border-[#FFAC38]' }` }>{text}</button>
    )
}
export default Lobby;
