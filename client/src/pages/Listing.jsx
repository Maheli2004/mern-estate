import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import {FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();

    const {currentUser} = useSelector((state) => state.user);
    
    useEffect(()=>{
        const fetchListing = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success === false) {
                setError(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
        };
        fetchListing();
    }, [params.listingId]);
    console.log(loading)
  return (
    <main className="bg-white m-3 p-3 pt-16">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
            <div>
                <div className="bg-[#fff] shadow-md shadow-[#595959] mb-10">
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div 
                                className="h-[600px] rounded-lg m-5 shadow-lg shadow-slate-400 " 
                                style={{ background: `url(${url}) center no-repeat `, backgroundSize: 'cover'}}
                                ></div>
                            
                                {listing.offer && (
                                        <p className="bg-red-500 text-white text-lg font-semibold px-8 py-2 m-10 absolute  top-12 right-0  border-r-8 border-white shadow-md shadow-red-300">
                                        * DISCOUNT : ${+listing.regularPrice - +listing.discountPrice}
                                        </p>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    <h1 className="text-2xl font-bold leading-relaxed text-gray-800 text-left ml-10 pt-5 bg-white" >{listing.name}</h1>

                        <div className="absolute top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                            <FaShare
                            className="text-slate-500"
                            onClick={()=> { navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(()=> {
                            setCopied(false);
                            }, 2000);
                            }}
                            />
                        </div>

                        <p className="flex items-center mt-2  ml-10 gap-2 text-slate-600 text-sm">
                            <FaMapMarkerAlt className="text-green-700"/>
                            {listing.address}
                        </p>

                        {copied && ( 
                        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>
                    )}

                    <div className="flex flex-col max-w-4xl mx-auto ml-10 mt-5 mb-5">
                            <p className='text-2xl font-semibold'>
                                ${''}
                                {listing.offer 
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                                {listing.type === "rent" && " / month"}
                            </p>
                    </div>
                    
                
                    <div className="flex gap-4 ml-10 pb-5 text-lg">
                        <p className="bg-[#c00f0f] w-full max-w-[180px] text-white text-center p-3 rounded-md">
                            {listing.type === "rent" ? "For Rent" : "For Sale"}
                        </p>
                        {
                            listing.offer && (
                                <p className="bg-green-900 w-full max-w-[180px] text-white text-center p-3 rounded-md" >${+listing.regularPrice - +listing.discountPrice} OFF </p>                            
                                // <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md" >${+listing.regularPrice - +listing.discountPrice}</p>                            
                            )
                        }
                    </div>

                </div>

                <div className="mb-10">
                <h1 className="text-2xl font-bold leading-relaxed text-gray-800 text-left ml-10 mb-5 bg-white" >Details</h1>
                <ul  className=" bg-white text-xl text-gray-700 flex flex-wrap gap-4 sm:gap-6 w-50 ml-10">
                        <li className='flex text-black items-center gap-1 whitespace-nowrap shadow shadow-slate-400 rounded-lg bg-slate-400 bg-opacity-25 px-5 font-semibold'>
                            <FaBed className='text-lg h-24 w-9' />
                            {listing.bedrooms > 1
                            ? `${listing.bedrooms} beds `
                            : `${listing.bedrooms} bed `}
                        </li>

                        <li className='flex text-black items-center gap-1 whitespace-nowrap shadow shadow-slate-400 rounded-lg bg-slate-400 bg-opacity-25 px-5 font-semibold'>
                            <FaBath className='text-lg h-24 w-9' />
                            {listing.bathrooms > 1
                            ? `${listing.bathrooms} bath `
                            : `${listing.bathrooms} bath `}
                        </li>

                        <li className='flex text-black items-center gap-1 whitespace-nowrap shadow shadow-slate-400 rounded-lg bg-slate-400 bg-opacity-25 px-5 font-semibold'>
                            <FaParking className='text-lg h-24 w-9' />
                            {listing.parking ? "Parking spot" : "No Parking spot"}
                        </li>

                        <li className='flex text-black items-center gap-1 whitespace-nowrap shadow shadow-slate-400 rounded-lg bg-slate-400 bg-opacity-25 px-5 font-semibold'>
                            <FaChair className='text-lg h-24 w-9' />
                            {listing.furnished ? "Furnished" : "Unfurnished"}
                        </li>
                    </ul>
                </div>

                <div className="mb-10">
                <h1 className="text-2xl font-bold leading-relaxed text-gray-800 text-left ml-10 mb-5 bg-white" >Description</h1>
                <p className="ml-10 text-slate-800 justify-center ">
                        <span className="font-semibold text-black">
                        </span>
                        {listing.description}
                </p>
                </div>

                <div className="ml-10">
                {currentUser && listing.userRef !== currentUser._id  && !contact && (
                        <button onClick={()=> setContact(true)} className="bg-[#1e2d3b] rounded-lg text-white shadow-lg p-3 hover:opacity-95 ">Contact landlord</button>
                    )}
                    {contact && <Contact listing={listing}/>}

                </div>

            </div>
        )}
    </main>
  );
}
