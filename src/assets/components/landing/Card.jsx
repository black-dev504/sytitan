import React from 'react';

const Card = ({ img, title, paragraph }) => {
  return (
    <div>
      <div className="flex flex-col tems-center min-h-[170px] my-8 border text-center border-[#FFAC38] px-7 py-1 rounded-2xl">
        
          <h1 className="font-bold mb-[10px] text-[20px] text-[#ECECEC]">{title}</h1>
          <p className="text-[#ECECEC] text-[16px] font-normal">{paragraph}</p>
      </div>
    </div>
  );
};

export default Card;
