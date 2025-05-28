import {useState} from 'react'

const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
   <section className='flex flex-col text-white lg:px-25 bg-[#252525] '>
        <div className='flex px-5 py-4  items-center justify-between'>
            <img src="/icons/logo.svg" alt="logo" />

            <ul className=' hidden md:flex items-center gap-10 justify-between'>
                <li className='hover:underline hover:text-blue-500'><a href="/home"></a>Home</li>
                <li className='hover:underline hover:text-blue-500' ><a href="/about"></a>About us</li>
                <li className='hover:underline hover:text-blue-500'><a href="/program"></a>Our program</li>
                <li className='hover:underline hover:text-blue-500 text-[#FFAC38]'><a href="/contact"></a>Contact Us</li>
            </ul>

        {
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        }
        </div>
        <div className='relative'>
        {isMenuOpen && (
        <div className="md:hidden w-full z-10 absolute text-[#e3e3e3] bg-black px-4 py-2">
          <ul className="flex flex-col space-y-2">
               <li className='hover:underline hover:text-blue-500'><a href="/home"></a>Home</li>
                <li className='hover:underline hover:text-blue-500' ><a href="/about"></a>About us</li>
                <li className='hover:underline hover:text-blue-500'><a href="/program"></a>Our program</li>
                <li className='hover:underline hover:text-blue-500 text-[#FFAC38]'><a href="/contact"></a>Contact Us</li>
          </ul>
        </div>
      )}
      </div>


   </section>
  )
}

export default Header
