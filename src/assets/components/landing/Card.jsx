import React from 'react';

const Card = ({ img, title, paragraph }) => {
  return (
  
      <div className="flex relative z-10 flex-col tems-center min-h-[170px] my-8 border text-center border-[#FFAC38] px-7 py-7 rounded-2xl">

      
        
          <h1 className="font-bold mb-[10px] text-[20px] text-[#FFAC38]">{title}</h1>
          <p className="text-[#ECECEC] text-[16px] font-normal">{paragraph}</p>
      </div>
    
  );
};

export default Card;
