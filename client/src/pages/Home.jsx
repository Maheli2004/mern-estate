// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import ListingItem from "../components/ListingItem";


// export default function Home() {
// const [offerListings, setOfferListings] = useState([]);
// const [saleListings, setSaleListings] = useState([]);
// const [rentListings, setRentListings] = useState([]);

// SwiperCore.use([Navigation]);
// console.log(offerListings);

// useEffect(()=>{
//   const fetchOfferListings = async () => {
//     try {
//       const res = await fetch("api/listing/get?offer=true&limit=3");
//       const data = await res.json();
//       setOfferListings(data);
//       fetchRentListings();
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const fetchRentListings = async () => {
//     try {
//       const res = await fetch("api/listing/get?type=rent&limit=3");
//       const data = await res.json();
//       setRentListings(data);
//       fetchSaleListings();
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const fetchSaleListings = async () => {
//     try {
//       const res = await fetch("api/listing/get?type=sale&limit=3");
//       const data = await res.json();
//       setSaleListings(data);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   fetchOfferListings();
// },[]);


//   return (
//     <div className="bg-[#031E18]">
      
//       {/* Top */}
//       <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">

//         <h1 className="text-white font-bold text-7xl lg:text-9xl">
//           Find your 
//           <br/>
//           <span className="text-[#FFE715]">Dream</span>
//           <br/>
//           Place
//         </h1>

//         <div className="text-gray-400 text-xs sm:text-sm">
//           Sahand Estate is the best place to find your next perfect place to live.
//           <br/>
//           We have wide range of properties for to choose from.
//         </div>

//         <Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
//           Lets get started...
//         </Link>
//       </div>

//       {/* swiper */}

//       <Swiper navigation>
//       { offerListings && 
//         offerListings.length > 0 && 
//         offerListings.map((listing) => (
//             // eslint-disable-next-line react/jsx-key
//             <SwiperSlide >
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: 'cover',
//                 }}
//                 className='h-[500px]'
//                 key={listing._id}
//               ></div>
//             </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* listing results for offer , sale and rent  */}

//       <div className=" max-w-6xl mx-auto p-2 flex flex-col gap-8 my-10">

//         {
//           offerListings && offerListings.length > 0 && (
//             <div>
//               <div className="my-3">
//                 <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
//                 <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"} >Show More Offers</Link>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 {
//                   offerListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>

//             </div>
//           )
//         }
        
//         {
//           rentListings && rentListings.length > 0 && (
//             <div>
//               <div className="my-3">
//                 <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
//                 <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"} >Show More Places For Rent</Link>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 {
//                   rentListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>

//             </div>
//           )
//         }

// {
//           saleListings && saleListings.length > 0 && (
//             <div>
//               <div className="my-3">
//                 <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
//                 <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"} >Show More places for sale</Link>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 {
//                   saleListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>

//             </div>
//           )
//         }

//       </div>

//     </div>
//   )
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";


export default function Home() {
const [offerListings, setOfferListings] = useState([]);
const [saleListings, setSaleListings] = useState([]);
const [rentListings, setRentListings] = useState([]);

SwiperCore.use([Navigation]);
console.log(offerListings);

useEffect(()=>{
  const fetchOfferListings = async () => {
    try {
      const res = await fetch("api/listing/get?offer=true&limit=3");
      const data = await res.json();
      setOfferListings(data);
      fetchRentListings();
    } catch (error) {
      console.log(error)
    }
  }
  const fetchRentListings = async () => {
    try {
      const res = await fetch("api/listing/get?type=rent&limit=3");
      const data = await res.json();
      setRentListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error)
    }
  }
  const fetchSaleListings = async () => {
    try {
      const res = await fetch("api/listing/get?type=sale&limit=3");
      const data = await res.json();
      setSaleListings(data);
    } catch (error) {
      console.log(error)
    }
  }
  fetchOfferListings();
},[]);


  return (
    <div className="bg-gradient-to-r from-[#031411] to-[#07221d] pb-5 pt-16">
      <Swiper navigation>
        { offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          // eslint-disable-next-line react/jsx-key
          <SwiperSlide >
            <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover',}}className='h-[550px]' key={listing._id}></div>
            
            <div className="flex flex-col gap-6 max-w-6xl mx-auto absolute top-1">
              <div className="p-24">
              <h1 className="text-white font-bold text-6xl lg:text-8xl">
              Find your
              <br/>
              <span className="text-[#f6ff00]"> Dream</span>
              <br/>
              Place</h1>
            </div>
              
              <div className=" absolute top-28 -right-full flex -space-x-4 rtl:space-x-reverse p-2" name="users">
                <img className="w-16 h-16 border-2 border-white rounded-full " src="https://images.pexels.com/photos/3765118/pexels-photo-3765118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                <img className="w-16 h-16 border-2 border-white rounded-full " src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                <img className="w-16 h-16 border-2 border-white rounded-full " src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <img className="w-16 h-16 border-2 border-white rounded-full " src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <p className="w-16 h-16 border-2 bg-[#bcb9b9] border-white rounded-full pt-5 font-bold "> + 9999 </p>
              </div>
            

              <Link to={"/search"} >
              <div className="absolute top-32 -right-full max-w-2xl mx-auto bg-white rounded-full mt-20" name='search'>
                <input placeholder="Lets find Home, Appartments..." className="rounded-full w-96 h-12 bg-transparent py-2 pl-10 pr-16 outline-none border-2 border-gray-300 shadow-inner shadow-gray-700" type="text" name="query" id="query"/>
                <button type="submit" className="absolute right-0 top-0 items-center h-12 px-4 py-2 text-sm text-black shadow-inner shadow-gray-400 transition duration-150 ease-in-out rounded-full outline-none bg-[#f6ff00] sm:px-6 sm:text-base sm:font-medium hover:bg-[#f6ff00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f6ff00]">
                  Search
                  </button>
              </div>
              </Link>

            </div>
          </SwiperSlide>))}
      </Swiper>

      <div  style={{ background: `url("https://media.istockphoto.com/id/1269545797/photo/emerald-room-interior-living-room-interior-mockup-empty-emerald-wall-3d-rendering.jpg?s=2048x2048&w=is&k=20&c=yK1h4No-aYIzPRPH2zNRJJnX1st3Ivwegr2fPVsy43k=") center no-repeat`, backgroundSize: 'cover',}} className=" relative bg-black grid mt-0 grid-cols-1 gap-0 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4" name='stat'>
        <div className="flex flex-col backdrop-blur-lg bg-white/10  p-8 pl-15 pr-10">
          <div className="text-sm font-semibold leading-6 text-gray-300">words written in 2023</div>
          <div className="order-first text-3xl font-semibold tracking-tight text-white">12 million</div>
        </div>
        
        <div className="flex flex-col backdrop-blur-lg bg-white/10  p-8">
          <div className="text-sm font-semibold leading-6 text-gray-300">words written in 2023</div>
          <div className="order-first text-3xl font-semibold tracking-tight text-white">12 million</div>
        </div>

        <div className="flex flex-col backdrop-blur-lg bg-white/10 p-8">
          <div className="text-sm font-semibold leading-6 text-gray-300">words written in 2023</div>
          <div className="order-first text-3xl font-semibold tracking-tight text-white">12 million</div>
        </div>

        <div className="flex flex-col backdrop-blur-lg bg-white/10 p-8">
            <div className="text-sm font-semibold leading-6 text-gray-300">words written in 2023</div>
            <div className="order-first text-3xl font-semibold tracking-tight text-white">12 million</div>
        </div>

      </div>


      {/* Featured Properties  */}

      <div className="bg-gradient-to-r from-[#031411] to-[#07221d] h-screen p-20 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

          <div className="ml-10 mb-10">
            <h2 className="text-6xl font-bold text-[#FFE515] ">Featured <br/> <span className="text-6xl font-normal text-[#ffffff] ml-36">Properties</span></h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-4">

            <Link to={"/search?offer=true"}
                className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-60">
                <img src="https://i.pinimg.com/564x/bf/3f/7c/bf3f7cb187349c4e59954cd6c38cceaa.jpg" loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span className="relative ml-10 mb-10 inline-block text-2xl font-semibold text-white ">OFFERS</span>
            </Link>

            <Link to={"/search?type=sale"}
                className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-60">
                <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" loading="lazy" alt="Photo by Magicle" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span className="relative ml-10 mb-10 inline-block text-2xl font-semibold text-white ">SALES</span>
            </Link>

            <Link to={"/search?type=rent"}
                className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-60">
                <img src="https://i.pinimg.com/564x/29/8e/8b/298e8b9deb09df8eaffe364a8ccf4656.jpg" loading="lazy" alt="Photo by Martin Sanchez" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span className="relative ml-10 mb-10 inline-block text-2xl font-semibold text-white ">RENT</span>
            </Link>

            <Link to={"/search?furnished=true"}
                className="group relative flex h-40 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-60">
                <img src="https://i.pinimg.com/736x/be/1d/ab/be1dab294012a488a096d9e2742143ee.jpg" loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span className="relative ml-10 mb-10 inline-block text-2xl font-semibold text-white ">FURNISHED</span>
            </Link>
        </div>
    </div>
</div>


      {/* listing results for offer , sale and rent  */}

      <div className=" max-w-6xl mx-auto p-2 flex flex-col gap-8 m-5">

        {
          offerListings && offerListings.length > 0 && (
            <div>
            <div className="text-center">

              <h2 className=" text-6xl font-normal text-[#ffffff] mb-16">Recent <span className="text-6xl font-bold text-[#FFE515]">Offers</span></h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
              <Link className="flex justify-center mt-3 text-sm text-[#FFE515] opacity-75 hover:underline" to={"/search?offer=true"} >View all offers... </Link>

            </div>
          )
        }
        
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className="text-center">

              <h2 className=" text-6xl font-normal text-[#ffffff] mb-16">Recent Places for <span className="text-6xl font-bold text-[#FFE515]">Rent</span></h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
              <Link className="flex justify-center mt-3 text-sm text-[#FFE515] opacity-75 hover:underline" to={"/search?type=rent"} >View all rents... </Link>

            </div>
          )
        }

{
          saleListings && saleListings.length > 0 && (
            <div>
              <div className="text-center">
              <h2 className=" text-6xl font-normal text-[#ffffff] mb-16">Recent Places for <span className="text-6xl font-bold text-[#FFE515]">Sale</span></h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
              <Link className="flex justify-center mt-3 text-sm text-[#FFE515] opacity-75 hover:underline" to={"/search?type=sale"} >View all sales... </Link>

            </div>
          )
        }

      </div>

      

    </div>
  )
}

