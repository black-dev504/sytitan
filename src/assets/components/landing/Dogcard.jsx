import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authprovider';
import { profile as getProfile } from '../../../auth';

const Dogcard = ({ images, name, age, color, serial_no }) => {
  const { setDogData } = useAuth();
  const navigate = useNavigate();

  // Handles click on "Open Profile" button
  const handleClick = async () => {
    try {
      const response = await getProfile(serial_no);
      const dog = response.data.dog;
      console.log(dog);

      // Store dog data in global context and navigate to profile
      setDogData(dog);
      navigate('/profile');
    } catch (err) {
      console.error('Failed to fetch dog profile:', err);
    }
  };

  // Fallback image if no image provided
  const mainImage = images?.[0] || '/images/noimgplaceholder.svg';

  return (
    <div className="rounded-4xl md:min-w-0 min-w-[300px] max-w-[400px] flex flex-col bg-[#252525]">
      
      {/* Dog Image */}
      <div className="w-full h-[300px]">
        <img
          src={mainImage}
          alt={`${name || 'Dog'} image`}
          className="object-cover w-full h-full rounded-t-4xl overflow-hidden"
        />
      </div>

      {/* Dog Info */}
      <div className="flex flex-col pl-3 py-5">
        <h2 className="my-2 font-bold text-[#ECECEC] text-[20px]">
          <span className="text-white">{name || 'Unnamed'}</span>
        </h2>
        <p className="text-[#FFAC38] text-[16px] font-bold">
          Age:{' '}
          {age ? (
            <span className="text-white">{age}</span>
          ) : (
            <span className="text-red-500">Not Available</span>
          )}
        </p>
        <p className="text-[#FFAC38] text-[16px] font-bold">
          Color:{' '}
          {color ? (
            <span className="text-white">{color}</span>
          ) : (
            <span className="text-red-500">Not Available</span>
          )}
        </p>
      </div>

      {/* Profile Button */}
      <button
        onClick={handleClick}
        className="cursor-pointer border border-[#FFAC38] text-[#FFAC38] hover:bg-primary hover:text-white font-medium text-[16px] rounded-[40px] ml-3 mb-5 py-4 px-5 max-w-[170px]"
      >
        Open Profile
      </button>
    </div>
  );
};

export default Dogcard;
