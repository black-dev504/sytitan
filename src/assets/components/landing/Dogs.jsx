import React from 'react'
import Dogcard from './Dogcard'

const Dogs = () => {
  const data = [
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
  return (
  <section className=' bg-black justify-center flex flex-col items-center' >

        <h1 className='text-5xl text-[#ECECEC] font-semibold text-center py-12'>MEET THE BULLIES</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 px-5 lg:px-25 pt-8'>

          {data.map((data,index)=>(
             <Dogcard name={data.name} age={data.age} status={data.status} img={data.img} key={index}/>

          ))}
        </div>
      <button className='px-9 py-6 hover:border-1 max-w-[200px] mt-8 cursor-pointer rounded-[40px] bg-primary text-white' >View more </button>

  </section>
  )
}

export default Dogs
