import { Link } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

export default function SignUp() {
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
        <div className="hidden lg:block lg:w-1/2 bg-cover rounded-lg relative" style={{backgroundImage: "url('https://img.freepik.com/free-photo/white-houses-green-cloth-arrangement_23-2149817702.jpg?t=st=1717856588~exp=1717860188~hmac=457342b698449e134592f4510da65e35a01d6a4f360a747d721d25b9b4a46336&w=1060')"}}>
          <div className=" absolute inset-0 border border-white  rounded-lg  items-center justify-center text-white text-4xl font-sans font-semibold bg-[#1b1b1b] bg-opacity-50 p-10">
            <span>Take A Big Step Into</span>
            <div className="h-3"></div>
            <span>The Future Of</span>
            <div className="h-3"></div>
            <span>Living</span>
            <p className="mt-6 mb-6 text-sm font-extralight">Trust us with your dreams! We are ready to help you build the dream property that will be your future.</p>
          </div>

          <div className="absolute bottom-10 left-10 right-30 bg-black bg-opacity-75 text-white text-center py-1 rounded-2xl">
            <button className="inline-flex items-center justify-center px-4 py-2 bg-transparent border border-transparent font-semibold text-white">
              <FaSearch className="h-5 w-6 mr-2 text-white" />
              Watch Demo
            </button>
          </div>

        </div>

        <div className="w-full p-12 lg:w-1/2 rounded-lg">

          <h2 className="text-3xl font-bold text-gray-700 text-center">SIgn up</h2>

          <form className="flex flex-col mt-6">
            <input type="text" placeholder="Username" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-2" id="username" />
            <input type="email" placeholder="Email" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="email" />
            <input type="password" placeholder="Password" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="password" />
            <button className="bg-[#3182CE] rounded-lg text-white shadow-lg py-3 mt-6 hover:bg-blue-600 transition duration-300">Sign Up</button>
          </form>

          <p className="text-gray-600 mt-2 text-center sm:text-left">Already a member? <Link to={"/sign-in"} className="text-[#3182CE] hover:underline">Sign in</Link></p>

          <div className="mt-2 flex items-center justify-center sm:justify-start">
            <hr className="w-2/5 border-gray-300" />
            <p className="mx-4 text-gray-400">OR</p>
            <hr className="w-2/5 border-gray-300" />
          </div>

          <button className="bg-[#ff0000] rounded-lg text-white shadow-lg py-3 mt-4 hover:bg-red-600 transition duration-300 w-full">Sign Up with Google</button>
          
        </div>
      </div>
    </div>
  );
}


