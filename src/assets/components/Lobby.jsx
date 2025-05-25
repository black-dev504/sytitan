import {useState} from 'react';
import Dogcard from './landing/Dogcard';
import { getDogs as dogData } from '../../auth';

const Lobby = () => {
    const data = ['all', 'studs', 'bitches', 'puppies', 'upcoming']
    const [signal, setSignal] = useState('all')
    const [dogs, setDogs] = useState({})
    const [error, setError] = useState('')

    const dog_data = [
        {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully1.png'
        },
         {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully2.png'
        },
         {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully3.png'
        },
         {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully4.png'
        },
         {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully5.png'
        },
         {
          name: 'Karla',
          age: 2,
          status: 'Sold',
          img: '/images/bully6.png'
        }
      ]
    
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
        {/* <h1 className='text-white relative'>meet</h1> */}
     
      </div>

      <div className="px-5 lg:px-20 bg-[#252525] py-12">
        <div className="filters flex gap-6">
           {data.map((filter,index)=>(
                <Filterbutton text={filter} 
                 key={index}
                 onClick={()=> handleClick(filter)}
                 isSelected={filter===signal}  />
           ))}
        </div>
 
      </div>

       <section className=' bg-black justify-center flex flex-col items-center' >

        <h1 className='text-5xl text-[#ECECEC] font-semibold text-center py-12'>MEET THE BULLIES</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 px-5 lg:px-25 pt-8'>

          {dogs.length>0 &&dogs.map((data,index)=>(
             <Dogcard name={data.name} age={data.age} status={data.status} img={data.img} key={index}/>

          ))}
        </div>
      <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-8 cursor-pointer rounded-[40px] bg-primary text-white' >View more </button>

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
