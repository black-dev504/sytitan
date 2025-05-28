import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authprovider'
import { profile as getProfile} from '../../../auth'
const Dogcard = ({images, name, age, color, serial_no}) => {

  const { setDogData } = useAuth();
  const navigate = useNavigate();
  // const [imgplaceholder, setImgPlaceholder] = React.useState('/images/bully1.png');
  const handleClick = async()=>{
   const response = await getProfile(serial_no)
      .then((response)=>{
        console.log(response.data.dog)
        setDogData(response.data.dog)
        navigate('/profile')
      })
      .catch((err)=>{
        console.error(err)
      })
    
  }
  return (
    <div className='rounded-t-4xl max-w-[479px] flex flex-col  bg-[#252525]'>
        <div className=' w-full h-[300px]'>
        <img src={images[0]?images[0]:'/images/noimgplaceholder.svg'} className='object-cover w-full h-full rounded-t-4xl overflow-hidden' alt="" />
        </div>

        <div className='flex flex-col pl-3 py-5'>
            <h2 className='my-2 font-bold text-[#ECECEC] text-[20px] '><span className='text-white'>{name}</span></h2>
            <p className='text-[#FFAC38] text-[16px] font-bold'>Age: {age? <span className='text-white'>{age}</span>: <span className='text-red-500'>Not Available</span>}</p>
            <p className='text-[#FFAC38] text-[16px] font-bold'>Color:  {color? <span className='text-white'>{color}</span>: <span className='text-red-500'>Not Available</span>}
</p>
        </div>

         <button onClick={handleClick}  className=' cursor-pointer border-1 ml-3 max-w-[170px] text-[16px] font-medium hover:bg-primary hover:text-white border-[#FFAC38] text-[#FFAC38] rounded-[40px] mb-5 py-4 px-5'>Open Profile</button>
      
    </div>
  )
}

export default Dogcard
