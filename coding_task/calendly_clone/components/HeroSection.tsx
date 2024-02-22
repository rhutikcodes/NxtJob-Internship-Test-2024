import React from 'react'
import Image from 'next/image'
import heroBkgHalfNoMargin from '../public/hero-bkg-half-no-margin.png'

function HeroSection() {
  return (
    <div className=" justify-center mx-auto relative -z-20 flex mt-11">
          <Image
          priority
          src={heroBkgHalfNoMargin}
          alt="Image Background"
          width="1200"
          />
          <div className="absolute top-12 translate-y-1/2 text-6xl font-semibold text-nowrap left-1/2 -translate-x-1/2">Easy Scheduling ahead</div>
          <div className="absolute pt-10 w-auto top-12 text-base translate-y-20 left-1/2 -translate-x-1/2 text-center "><p>Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.</p></div>
          <div className="absolute mt-10 pt-20 w-auto top-12 translate-y-20 left-1/2 -translate-x-1/2 text-nowrap">Sign up free with Google or Microsoft.</div>
        </div>
  )
}

export default HeroSection