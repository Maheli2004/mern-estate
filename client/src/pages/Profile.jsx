import { FaPen, FaTrash } from 'react-icons/fa';
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
    <div className='bg-gradient-to-br from-[#4a5715] from-1% via-[#031411] via-15% to-[#031411] to-90% p-3 pt-16'>
      <div className='p-10 pb-2'>
        <h1 className="text-center text-6xl font-bold text-[#FFE515] pb-10">User <span className='text-6xl font-normal text-[#ffffff]'>Profile</span></h1>
        <div className ="h-60 overflow-hidden ">
          <img className =" object-cover object-top w-full rounded-3xl backdrop-blur-sm bg-black/10 " src='https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Mountain'/>
        </div>

      </div>

    <div className ="max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg p-3 mb-2 ">
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

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="border-4 border-white rounded-full object-cover object-center h-32 w-32 cursor-pointer self-center  mx-auto relative -mt-20  overflow-hidden" />
        <input type="text" placeholder="username" defaultValue={currentUser.username}  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="username" onChange={handleChange}/>
        <input type="email" placeholder="email" defaultValue={currentUser.email}  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="email" onChange={handleChange}/>
        <input type="password" placeholder="password" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3182CE] mt-4" id="password" onChange={handleChange}/>
        <button
          disabled={loading}
          className=' bg-[#FFE515] rounded-lg text-black text-lg font-bold shadow-lg shadow-[#ababab] py-3 mt-5 hover:bg-opacity-65 transition duration-300 disabled:opacity-60 w-60 mx-auto'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <p className="flex justify-center text-red-700 mt-5">
        {error ? error : ""}
      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      </div>

      <div className='flex justify-center max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg  p-3 mt-3 mb-3 '>
        {/* <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-opacity-95" to={"/create-listing"}> */}
      <Link className="text-xl font-semibold" to={"/create-listing"}>
        Create Listing
        </Link>
      </div>

      <div className="flex justify-center max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg p-3 mt-3 mb-3 ">
        <span onClick={handleDeleteUser} className=" cursor-pointer text-xl font-semibold ">Delete account</span>
      </div>

      <div className="flex justify-center max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg p-3 mt-3 mb-3">
        <span onClick={handleSignOut} className=" cursor-pointer text-xl font-semibold ">Sign out</span>
      </div>

      <div className="flex justify-center max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg p-3 mt-3 mb-3 ">
      <button onClick={handleShowListings} className="text-black text-xl font-semibold">Show Listing</button>
      <p className="text-red-700 mt-5">{showListingsError ? 'Error showing listings' : ''}</p>
      </div>
      
      {userListings && 
      userListings.length > 0 && 
      <div className="flex max-w-4xl mx-5 sm:max-w-xl md:max-w-3xl lg:max-w-xl xl:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white p-3 mb-3 flex-col gap-2">
        {/* <h1 className='text-center text-2xl font-semibold'> Your Listings</h1> */}
        {userListings.map((listing) => ( 
      <div key={listing._id} className="border border-[#b4b2b2] rounded-lg p-3 flex justify-between items-center gap-2">
        
        <Link  to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls} alt="listing cover" className="h-32 w-32 object-contain"/>
        </Link>

        <Link className='flex-1 text-[#161616] font-semibold text-lg hover:underline truncate' to={`/listing/${listing._id}`}>
        <p>{listing.name}</p>
        </Link>

        <div className='flex flex-col items-center'>
          {/* <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>

          <Link to={`/update-listing/${listing._id}`}>
          <button  className='text-green-700 uppercase'>Edit</button>
          </Link> */}

          <FaTrash onClick={()=>handleListingDelete(listing._id)} className="text-xl m-3 cursor-pointer text-[#bd2727]" type='button' />

          <Link to={`/update-listing/${listing._id}`} >
          <FaPen className="text-xl m-3 cursor-pointer text-[#0b531b]" type='button' />
          </Link>
        </div>

      </div>))}

      </div>}
    
    </div>
  );
}
