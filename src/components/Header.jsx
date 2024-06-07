import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ backgroundColor: 'rgb(2, 33, 28)' }} className='shadow-md'>
        <div className='flex justify-between items-center max-w-screen-xl mx-auto p-3 '>

            <Link to="/">
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Nest</span>
                <span className='text-slate-200'>Easy</span>
            </h1>
            </Link>

            <ul className="flex gap-8 items-center">
                <Link to="/"><li className="hidden sm:inline text-gray-300 transition-colors duration-300 hover:text-white font-semibold text-lg">Home</li></Link>
                <Link to="/about"><li className="hidden sm:inline text-gray-300 transition-colors duration-300 hover:text-white font-semibold text-lg">About</li></Link>
                <Link to="/sign-in"><li className="text-gray-300 transition-colors duration-300 hover:text-white font-semibold text-lg">Sign In</li></Link>
            </ul>
            
            <form className='p-2.5 rounded-lg flex items-center m-1 text-sm border border-gray-400 backdrop-brightness-40'>
                <input type='text' placeholder='Search...' 
                className='text-white bg-transparent focus:outline-none w-24 sm:w-64'/>

                <FaSearch className="text-white"/>
                {/* <FaSearch className="text-slate-600"/> */}
                
            </form>
    
        </div>
    </header>
  )
}





