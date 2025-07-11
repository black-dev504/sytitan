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
      <a href="/" className="hover:text-white">Home</a>
      <a href="/about" className="hover:text-white">About</a>
      <a href="/contact" className="hover:text-white">Contact</a>
      <a href="/privacy" className="hover:text-white">Privacy</a>
    </div>

    {/* Right Side - Socials */}
    <div className="flex gap-4"> 
      <a href="https://www.instagram.com/sy_titan?igsh=MTdzcDR6bWwxeng2aA==" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
      <a href="https://www.facebook.com/share/198j9aDnkT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
      <a href="https://www.tiktok.com/@sytitan?_t=ZM-8xwGQQ0YMdB&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-white">Tik Tok</a>
    </div>
  </div>
</footer>
  )
}

export default Footer