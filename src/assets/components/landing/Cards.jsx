import React from 'react'
import Card from './Card'


const Cards = () => {

    const data = [
        {
            title: 'MISSION',
            paragraph: 'To raise healthy, well-tempered dogs and match them with loving families.',
            img: '/images/missionpic.png'
        },
        {
            title: 'Our Vision',
            paragraph: 'To become the most trusted kennel for American Bully, known for care, quality, and integrity.',
            img: '/images/visionpic.png'
        },
        {
            title: 'Our Values',
            paragraph: 'Ethical Breeding, Health & Temperament....',
            img: '/images/valuespic.png'
        }
    ]
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 primary-font bg-[#252525] px-5 md:px-25 '>
        {data.map((data,index)=>(
            <Card key={index} img={data.img} title= {data.title} paragraph={data.paragraph} />
        ))}
    </div>
  )
}

export default Cards
