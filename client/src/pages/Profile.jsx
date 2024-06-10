import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector (state => state.user)
  return (
    <div className ="max-w-3xl mx-4 sm:max-w-lg md:max-w-2xl lg:max-w-lg xl:max-w-3xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-whitw shadow-xl rounded-lg text-gray-900 p-3 mt-10 mb-10 ">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>

      <div className ="rounded-t-lg h-32 overflow-hidden">
        <img className ="object-cover object-top w-full " src='https://media.istockphoto.com/id/1971556868/photo/view-from-above-of-residential-houses-in-living-area-in-rochester-ny-at-night-illuminated.webp?b=1&s=170667a&w=0&k=20&c=qaWhk54wSWtB3CIr-r7sq6nIqCiNTn9rW1gHCZQ557g=' alt='Mountain'/>
      </div>

      <form className="flex flex-col ">
        <img src={currentUser.avatar} alt="profile" className="border-4 border-white rounded-full object-cover object-center h-32 w-32 cursor-pointer self-center  mx-auto relative -mt-16  overflow-hidden" />
        <input type="text" placeholder="username" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="username"/>
        <input type="email" placeholder="email" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="email"/>
        <input type="password" placeholder="password" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="password"/>
        <button className=" bg-[#1062af] rounded-lg text-white shadow-lg py-3 mt-5 hover:bg-opacity-95 transition duration-300 disabled:opacity-80 w-4/5 mx-auto">update</button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete account</span>
        <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
    </div>
  )
}
