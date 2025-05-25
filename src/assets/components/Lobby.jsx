import {useState} from 'react';


const Lobby = () => {
    const data = ['all', 'studs', 'bitches', 'puppies', 'upcoming']
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
                <Filterbutton text={filter} key={index} />
           ))}
        </div>
 
      </div>
    </section>
  );
};

const Filterbutton = ({text})=>{

    const [clicked, setClicked] = useState(text!=='all'?false:true);

    return (
        <button onClick={()=> setClicked(!clicked)} className={`py-5 px-9 cursor-pointer text-[#FFAC38] rounded-[40px]  ${clicked?'border-0 bg-[#FFAC38]':'border-2 border-[#FFAC38]' }` }>{text}</button>
    )
}
export default Lobby;
