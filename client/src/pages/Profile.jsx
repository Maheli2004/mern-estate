import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector (state => state.user);
  const [file,setFile] = useState(undefined);
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});

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
    (error) => {
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setFormData({...formData, avatar: downloadURL})
      );
    }
  );
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
            {`Uploadin ${filePerc}%`}
            </span> )
            :
            filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

      <form className="flex flex-col ">
        <input onChange={(e)=> setFile(e.target.files[0])} type="file"ref={fileRef} hidden accept="image/*" />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="border-4 border-white rounded-full object-cover object-center h-32 w-32 cursor-pointer self-center  mx-auto relative -mt-16  overflow-hidden" />
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
