import { FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";


export default function CreateListing() {
  return (
    <main className =" bg-white shadow-xl rounded-lg m-5 p-3 max-w-4xl mx-auto">

      <div className="flex items-center">
        <Link to={"/profile"} ><FaArrowLeft className="text-xl m-3" /></Link>
        <h1 className="text-2xl font-bold p-3 my-7">Create a Listing</h1>
      </div>

      <form className="flex flex-col sm:flex-row gap-4">
          <div className='flex flex-col p-5 flex-1 gap-4 bg-white shadow-xl rounded-lg m-5 max-w-2xl mx-auto'>
            <h2 className='text-lg font-semibold'>Property Name</h2>
            <input type='text' placeholder='Name' className=' bg-gray-100 appearance-none border-2 border-gray-400 p-3 rounded-lg text-gray-700 focus:outline-none focus:bg-white focus:border-green-950 ' id="name" maxLength='62' minLength="10" required></input>
            <h2 className='text-lg font-semibold'>Property Description</h2>
            <input type='text' placeholder='Description' className='bg-gray-100 appearance-none border-2 border-gray-400 p-3 rounded-lg text-gray-700 focus:outline-none focus:bg-white focus:border-green-950 ' id="description" required></input>
            <h2 className='text-lg font-semibold' >Property Address</h2>
            <input type='text' placeholder='Address' className='bg-gray-100 appearance-none border-2 border-gray-400 p-3 rounded-lg text-gray-700 focus:outline-none focus:bg-white focus:border-green-950 ' id="address" required></input>

            <h2 className='text-lg font-semibold' >Listing Type</h2>
            <div className='flex gap-6 flex-wrap'>
               
             <div className='flex gap-2'>
               <input type='checkbox' id="sale" className='w-5'/>
               <span>Sell</span>
             </div>
             
             <div className='flex gap-2'>
               <input type='checkbox' id="rent" className='w-5'/>
               <span>Rent</span>
             </div>
            </div>

            <h2 className='text-lg font-semibold' >Additional Property Details</h2>
            <div className='flex gap-6 flex-wrap'>

             <div className='flex gap-2'>
               <input type='checkbox' id="parking" className='w-5 '/>
               <span>Parking spot</span>
             </div>

             <div className='flex gap-2'>
               <input type='checkbox' id="furnished" className='w-5'/>
               <span>Furnished</span>
             </div>

             <div className='flex gap-2 '>
               <input type='checkbox' id="offer" className='w-5 '/>
               <span>Offer</span>
             </div> 
            </div>
            
            <h2 className='text-lg font-semibold' >Property Specification</h2>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2 '>
                <input type='number' id="bebrooms" min="1" max="10" required className='p-3 bg-gray-100 appearance-none border-2 border-gray-400 rounded-lg'/>
                <p>Bedrooms</p>
              </div>

              <div className='flex items-center gap-2 '>
                <input type='number' id="bathrooms" min="1" max="10" required className='p-3 bg-gray-100 appearance-none border-2 border-gray-400 rounded-lg '/>
                <p>Bathrooms</p>
              </div>
            </div>

              <h2 className='text-lg font-semibold'>Property Specification</h2>
              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2 '>
                  <input type='number' id="regularPrice" min="1" max="10" required className='p-3 bg-gray-100 appearance-none border-2 border-gray-400 rounded-lg '/>
                  <div className='flex flex-col items-center'>
                  <p>Regular price</p>
                  <span className='text-xs'>($ / month)</span>
                  </div>
                </div>

                <div className='flex items-center gap-2 '>
                  <input type='number' id="discountPrice" min="1" max="10" required className='p-3 bg-gray-100 appearance-none border-2 border-gray-400 rounded-lg'/>
                  <div className='flex flex-col items-center'>
                  <p>Discount price</p>
                  <span className='text-xs'>($ / month)</span>
                  </div>
                </div>
              </div>
          
          </div>

          <div className='flex flex-col p-5 flex-1 gap-4 bg-white shadow-xl rounded-lg m-5 max-w-2xl mx-auto'>
            <h2 className='text-lg font-semibold'>Property Images
              <p className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</p>
            </h2>

            <div className='flex gap-4'>
              <input className='p-3 bg-gray-100 appearance-none border-2 border-gray-400 rounded-lg w-full' type='file' id="images" accept='image/*' multiple/>
              <button className='p-3 text-gray-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>Create Listing</button>
          </div>
      </form>
      <button className='bg-[#1062af] rounded-lg text-white shadow-lg py-3 mt-3 mb-3 hover:bg-opacity-95 transition duration-300 disabled:opacity-80 w-3/5 mx-auto block'>Create Listing</button>
    </main>
  );
}
