/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdLocationOn} from "react-icons/md";

export default function ListingItem({listing}) {
  return (
    <div className=" relative isolate flex bg-white  hover:shadow-lg  transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] ">

        <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] || "https://www.agentadvice.com/wp-content/uploads/2020/12/shutterstock_1247473441-scaled.jpg"} 
        alt="listingCover" className=" h-[320px] sm:h-[300px] w-full object-cover hover:scale-105 transition-scale duration-300"></img>

        <div className=" p-3 flex flex-col w-full h-24" >
            <div className="absolute inset-0 top-60" name="photoHeader">
                <p className="truncate text-xl font-bold text-[#fff] pl-4">{listing.name}</p>

                <div className="flex items-center gap-0 pl-4">
                    <MdLocationOn className="h-4 w-4 text-[#acabab]"/>
                    <p className="text-sm text-[#acabab] truncate w-full">{listing.address}</p>
                </div>
            </div>

            <p className=" text-sm text-slate-900 line-clamp-1">{listing.description}</p>

            <div className='mt-1 text-slate-700 flex gap-4'>
                <div className='font-bold text-xs'>
                {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beds `
                    : `${listing.bedrooms} bed `}
                </div>

                <div className='font-bold text-xs'>
                {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths `
                    : `${listing.bathrooms} bath `}
                </div>
            </div>

            <p className=" text-black mt-0 font-bold text-xl"> $ 
                {listing.offer ? listing.discountPrice.toLocaleString("en-us") : listing.regularPrice.toLocaleString("en-us")}
                {listing.type === "rent" && " / month"}
            </p>
            
            
        </div>

        </Link>
    </div>
  )
}


