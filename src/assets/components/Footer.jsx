import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  return (
<footer className="bg-gray-900 text-gray-300 py-8 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    {/* Left Side - Branding or Info */}
    <div className="text-center md:text-left">
      <button onClick={()=>navigate('/admin/dashboard')} className="w-[200px]">
        <img src="/icons/footerlogo1.svg" alt="footerlogo" className='object-cover overflow-hidden w-full mt-5'/>
      </button>
      <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </div>

    {/* Center - Navigation Links */}
    <div className="flex gap-6 text-sm">
      <a href="#" className="hover:text-white">Home</a>
      <a href="#" className="hover:text-white">About</a>
      <a href="#" className="hover:text-white">Contact</a>
      <a href="#" className="hover:text-white">Privacy</a>
    </div>

    {/* Right Side - Socials */}
    <div className="flex gap-4"> 
      <a href="#" className="hover:text-white">Twitter</a>
      <a href="#" className="hover:text-white">Instagram</a>
      <a href="#" className="hover:text-white">LinkedIn</a>
    </div>
  </div>
</footer>
  )
}

export default Footer