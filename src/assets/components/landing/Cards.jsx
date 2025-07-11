import React from 'react'
import Card from './Card'


const Cards = () => {

    const data = [
        {
            title: 'MISSION',
            paragraph: 'To evolve the American Bully breed by producing dogs with extreme (X3M) features—powerful structure, striking presence, and stable temperaments—while maintaining the highest standards of health, quality, and conformance to breed guidelines.',
            img: '/images/missionpic.png'
        },
        {
            title: 'Our Vision',
            paragraph: 'To redefine excellence in the American Bully world by setting a new benchmark for what’s possible—crafting dogs that inspire pride, loyalty, and admiration through a perfect blend of tradition, innovation, and elite breeding practices.',
            img: '/images/visionpic.png'
        },
        {
            title: 'Our Values',
            paragraph: 'To champion excellence, integrity, and innovation in American Bully breeding—producing top-tier dogs without compromise, and raising each pup with care, purpose, and pride.',
            img: '/images/valuespic.png'
        }
    ]
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-6 py-10 relative primary-font bg-[#252525] px-5 md:px-25 z-0'>




      
    {/* <div className="absolute inset-0 bg-black/60 z-5"></div> */}
        {data.map((data,index)=>(
            <Card key={index} img={data.img} title= {data.title} paragraph={data.paragraph} />
        ))}
    </div>
  )
}

export default Cards
