import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file,setFile] = useState(undefined);
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
    () => {
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setFormData({...formData, avatar: downloadURL})
      );
    }
  );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      // eslint-disable-next-line no-undef
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        showListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      showListingsError(true)
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message)
        return;
      }
      setUserListings((prev) => 
        prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message)
      }
  };

  return (
    <div className ="max-w-3xl mx-4 sm:max-w-lg md:max-w-2xl lg:max-w-lg xl:max-w-3xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg p-3 mt-10 mb-10 ">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>

      <div className ="rounded-t-lg h-32 overflow-hidden">
        <img className ="object-cover object-top w-full " src='https://media.istockphoto.com/id/1971556868/photo/view-from-above-of-residential-houses-in-living-area-in-rochester-ny-at-night-illuminated.webp?b=1&s=170667a&w=0&k=20&c=qaWhk54wSWtB3CIr-r7sq6nIqCiNTn9rW1gHCZQ557g=' alt='Mountain'/>
        
      </div>

      <p className="text-sm self-center font-semibold">
          {fileUploadError ? 
          (<span className="text-red-700">Error image upload!
          (image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">
            {`Uploading ${filePerc}%`}
            </span> )
            :
            filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

      <form onSubmit={handleSubmit} className="flex flex-col ">
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="border-4 border-white rounded-full object-cover object-center h-32 w-32 cursor-pointer self-center  mx-auto relative -mt-16  overflow-hidden" />
        <input type="text" placeholder="username" defaultValue={currentUser.username}  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="username" onChange={handleChange}/>
        <input type="email" placeholder="email" defaultValue={currentUser.email}  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="email" onChange={handleChange}/>
        <input type="password" placeholder="password" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="password" onChange={handleChange}/>
        <button
          disabled={loading}
          className='bg-[#1062af] rounded-lg text-white shadow-lg py-3 mt-5 hover:bg-opacity-95 transition duration-300 disabled:opacity-80 w-4/5 mx-auto'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        {/* <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-opacity-95" to={"/create-listing"}> */}
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center mt-5 w-4/5 mx-auto hover:bg-opacity-95" to={"/create-listing"}>
        Create Listing
        </Link>

      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer ">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error : ""}
      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full">Show Listing</button>
      <p className="text-red-700 mt-5">{showListingsError ? 'Error showing listings' : ''}</p>

      {userListings && 
      userListings.length > 0 && 
      <div className="flex flex-col gap-4">
        <h1 className='text-center text-2xl font-semibold'> Your Listings</h1>
        {userListings.map((listing) => ( 
      <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
        
        <Link  to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls} alt="listing cover" className="h-16 w-16 object-contain"/>
        </Link>

        <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
        <p>{listing.name}</p>
        </Link>

        <div className='flex flex-col items-center'>
          <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
          <button  className='text-green-700 uppercase'>Edit</button>
          <FaArrowLeft onClick={()=>handleListingDelete(listing._id)} className="text-xl m-3 cursor-pointer" type='button' />
          <FaArrowLeft className="text-xl m-3" type='button' />
        </div>

      </div>))}

      </div>}
    </div>
  );
}
