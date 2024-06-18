// import React from 'react'

export default function About() {
  return (
    <div className="bg-gradient-to-br from-[#4a5715] from-1% via-[#031411] via-15% to-[#031411] to-90% pt-16">
      <section className="overflow-hidden  py-8 sm:py-16">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="lg:pr-8 lg:pt-4">
        <div className="lg:max-w-lg">
          <h1 className="text-center text-6xl font-bold text-[#FFE515] pb-10">About <span className='text-6xl font-normal text-[#ffffff]'>Us</span></h1>
          <p className="mt-6 text-lg leading-8 text-[#e2e2e2]">Welcome to NestEasy, your ultimate destination for all things real estate. At NestEasy, we specialize in connecting buyers, sellers, and renters with their ideal properties. Whether you`re looking to buy a cozy nest, rent a stylish apartment, or explore exclusive offers, our platform offers a seamless and intuitive experience. Our dedicated team of professionals is committed to providing exceptional service, guiding you through every stage of your real estate journey with expertise and care. Discover your next home with NestEasy and experience the ease of finding your perfect nest.</p>
        </div>
        <div className="mt-10 flex items-center gap-x-6">
          <a href={"/sign-up"} className="rounded-md border border-[#FFE515] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FFE515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start for free</a>
        </div>
      </div>
      <img src="https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
    </div>
  </div>
</section>

    </div>
  )
}
