import { Link, useNavigate } from "react-router-dom";
import { FaPlayCircle} from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if(data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
        // console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  // console.log(formData);
  
  return (
    <div className="pt-10 bg-black h-screen">
      
      <div className="h-5/6 flex bg-white rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
        
        <div className="hidden lg:block lg:w-1/2 bg-cover rounded-lg relative m-2" style={{backgroundImage: "url('https://t4.ftcdn.net/jpg/06/07/20/55/240_F_607205567_bWqKi0R1RdkUslLio5sy3887LSOlD96z.jpg') "}} >

          <div className=" flex flex-col justify-center items-center absolute inset-0 border border-white  rounded-lg text-white text-4xl font-sans font-semibold bg-[#031104] bg-opacity-30 p-10 mt-[-80px]">
            <span className="">Take A Big Step Into</span>
            <div className="h-2"></div>
            <span>The <span className="text-[#bbbbbb]">Future</span> Of</span>
            <div className="h-2"></div>
            <span>Living</span>
            <p className="mt-5 mb-6 text-sm font-extralight">Trust us with your dreams! We are ready to help you build <br/> the dream property that will be your future.</p>
          </div>

          <div className="absolute bottom-10 left-10 right-30 bg-black bg-opacity-75 text-white text-center py-1 rounded-xl border">
            <button className="inline-flex items-center justify-center px-3 py-1 bg-transparent font-semibold text-white ">
              <FaPlayCircle className="h-5 w-6 mr-2 text-white" />
              Watch Demo
            </button>
          </div>

        </div>


        <div className="w-full p-12 lg:w-1/2 rounded-lg">

          <h2 className="text-3xl font-bold text-black text-center">WELCOME</h2>
          <h2 className="text-m font-normal text-gray-600 text-center">Welcom to NestEasy website</h2>

          <OAuth/>

          <div className="mt-6 flex items-center justify-center sm:justify-start">
            <hr className="w-2/5 border-gray-300 " />
            <p className="mx-4 text-gray-400">or</p>
            <hr className="w-2/5 border-gray-300" />
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col mt-3">
            <input type="email" placeholder="Email" className="p-3 rounded-lg border border-slate-400 focus:outline-none focus:border-[#3182CE] mt-4" id="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" className="p-3 rounded-lg border border-slate-400 focus:outline-none focus:border-[#3182CE] mt-4" id="password" onChange={handleChange}/>
            <button disabled={loading} className="bg-[#1c1c1c] rounded-lg text-white shadow-lg py-3 mt-12 hover:bg-black transition duration-300 disabled:opacity-90">
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {error && <p className="p-0 text-red-600 font-medium py-0 mt=0">{error}</p>}

          <p className="text-sm font-normal text-gray-600 mt-2 text-center sm:text-left">Already have an account? <Link to={"/sign-up"} className="text-[#3182CE] hover:underline">Sign Up</Link></p>
          
        </div>

      </div>
    </div>
  );
}