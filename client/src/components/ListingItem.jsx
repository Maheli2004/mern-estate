import { Link } from "react-router-dom";
import { MdLocationOn} from "react-icons/md";

export default function ListingItem({listing}) {
  return (
    <div className="bg-white  shadow-md shadow-gray-400  hover:shadow-lg  transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">

        <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] || "https://www.agentadvice.com/wp-content/uploads/2020/12/shutterstock_1247473441-scaled.jpg"} 
        alt="listingCover" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"></img>

        <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate font-manrope text-lg font-semibold text-gray-800">{listing.name}</p>

            <div className="flex items-center gap-1">
                <MdLocationOn className="h-6 w-6 text-green-700"/>
                <p className="text-sm text-gray-500 truncate w-full">{listing.address}</p>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">{listing.description}</p>

            <p className=" text-slate-500 mt-2 font-semibold"> $ 
                {listing.offer ? listing.discountPrice.toLocaleString("en-us") : listing.regularPrice.toLocaleString("en-us")}
                {listing.type === "rent" && " / month"}
            </p>
            
            <div className='text-slate-700 flex gap-4'>
                <div className='font-bold text-xs'>
                {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </div>

                <div className='font-bold text-xs'>
                {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </div>
            </div>
        </div>

        </Link>
    </div>
  )
}


