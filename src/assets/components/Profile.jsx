import react from 'react'
import { useAuth } from '../Authprovider'
import { dogs as similar } from '../../auth';
import React, { useEffect } from 'react';
import Dogcard from './landing/Dogcard';
import { set } from 'mongoose';


const Profile = () => {
 
    const { dog } = useAuth();
  if (!dog) {
    return <div className="text-center text-white">Loading...</div>;
  }
  const images = dog.images || []; 
  const [displayImage, setDisplayImage] = react.useState(images[0] || '/images/noimgplaceholder.svg');
  const [clicked, setClicked] = react.useState(images[0] || '');
  const [similarDogs, setSimilarDogs] = react.useState([])
  const handleImageClick = (image) => {
    setDisplayImage(image);
    setClicked(image);
  }

    useEffect(() => {
            const fetchSimilar = async () => {
            try {
              const response = await similar(dog.serial_no,3)
              console.log('similar=' , response.data.dogs);
              
              setSimilarDogs(response.data.dogs)
            } catch (err) {
              console.error('Failed to fetch dogs:', err);
            }
          };
  
  if (dog?.serial_no) {
    fetchSimilar();
  }
}, [dog.serial_no]);

    useEffect(() => {

    
  if (images) {
    setDisplayImage(images[0]);
    setClicked(images[0]);
  }

}, [images]);

  return (
  <section className=' '>
    <div className="container max-w-[1400px] mx-auto flex flex-col md:flex-row items-left lg:px-20 px-5 py-5 bg-[#252525] gap-10">
      <div className="images flex lg:flex-row flex-col gap-5">
        <div className="main-img w-full lg:w-[400px] h-[400px] rounded-[20px] overflow-hidden">
          <img className='object-cover w-full h-full overflow-hidden' src={displayImage} alt="" />
        </div>

        <div className="sub-imgs flex flex-row lg:flex-col gap-4">

          {images?  images.map((image, index) => (
            
          <button key={index} onClick={() => handleImageClick(image)} className={`sub-img border-2 ${ clicked === image &&'border-amber-500'} cursor-pointer rounded-[20px]`} >
             <img className='object-cover w-full rounded-[20px] h-full overflow-hidden' src={image} alt="" />
          </button>)): null}
        </div>

      </div>

      <div className="details justify-start flex flex-col">
        
        <h1 className='text-white font-bold text-[40px] text-primary'>{dog.name}</h1>
        <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Pedigree</span>
            {dog.pedigree?<a className='text-blue-500 hover:underline' href={dog.pedigree}>{dog.pedigree}</a>: <span className='text-red-500'>Not Available</span>}
      </div>
        <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Gender</span>
           {dog.gender? <span>{dog.gender}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Age</span>
           {dog.age? <span>{dog.age}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Color</span>
           {dog.color? <span>{dog.color}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Height</span>
           {dog.height? <span>{dog.height}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Head size</span>
           {dog.headsize? <span>{dog.headsize}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Class</span>
           {dog.class? <span>{dog.class}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
             <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Status</span>
           {dog.status? <span>{dog.status}</span>: <span className='text-red-500'>Not Available</span>}
      </div>
       <div className="flex justify-between text-white text-xl py-1 gap-6">
            <span className="font-bold">Registries</span>
          {dog.registries && dog.registries.length > 0 ? (<span>{dog.registries.join(', ')}</span>) : (<span className='text-red-500'>Not Available</span>)}
           
      </div>
      </div>
      </div>   

            <div className="flex flex-col bg-[#131313] px-5 lg:px-20 py-10">

        <h1 className='text-5xl relative text-[#ECECEC] font-semibold text-center py-12'>SIMILAR BULLIES</h1>
         <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8  pt-8'>

        
                  {similarDogs.length>0 && similarDogs.map((data,index)=>(
                     <Dogcard name={data.name} age={data.age} status={data.status} images={data.images} serial_no={data.serial_no} key={index}/>
        
                  ))}
                </div>

    </div>
      
   </section>
  )
}


export default Profile