import React from 'react'

const Dogsskeleton = () => {
  return (
 <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-[#1f1f1f] rounded-4xl min-w-[300px] max-w-[400px] p-4 shadow-md space-y-4"
        >
          <div className="h-[200px] w-full bg-gray-700 rounded-lg"></div>
         
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      ))}
    </>
  )
}

export default Dogsskeleton