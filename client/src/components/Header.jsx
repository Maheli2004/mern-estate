import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
    const {currentUser} = useSelector (state => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);
    

  return (
    <header className='bg-[#031411]  border-b border-[#1d1c1c] fixed w-full top-0 z-10' 
    // style={{ background: `url("") center no-repeat`, backgroundSize: 'cover',}} 
    >
        <div className='flex justify-between items-center max-w-screen-xl mx-auto p-2 '>

            <Link to="/">
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <img src="https://res.cloudinary.com/dv0m2dtyw/image/upload/v1717816792/guy1nnk4w7tn5jhzj19v.png" className="h-8" alt="Logo" />
                <span className='text-[#ffffff]'>Nest</span>
                <span className='text-[#f6ff00]'>Easy</span>
            </h1>
            </Link>

            <form onSubmit={handleSubmit} className='p-2.5 rounded-lg flex items-center m-1 text-sm border border-gray-400 backdrop-brightness-40 hover:border-white'>

                <input type='text' placeholder='Search...' 
                className='text-white bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)} />

                <button>
                    <FaSearch className="text-white"/>
                    {/* <FaSearch className="text-slate-600"/> */}
                </button>


            </form>

            <ul className="flex gap-8 items-center">
                <Link to="/"><li className="hidden sm:inline text-white transition-colors duration-300 hover:text-white font-semibold text-lg">Home</li></Link>
                <Link to="/about"><li className="hidden sm:inline text-white transition-colors duration-300 hover:text-white font-semibold text-lg">About</li></Link>
                <Link to="/profile">
                { currentUser ? (
                    <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 object-cover" src={currentUser.avatar} alt="profile"/>
                ): <li className="text-white transition-colors duration-300 hover:text-white font-semibold text-lg">Sign In</li>
                }
                </Link>
            </ul>
            
            
    
        </div>
    </header>
  )
}