import React from 'react'
import MaxWidthContainer from '@components/MaxWidthContainer'
import Logo from '@components/Logo'

function SimpleNavBar() {
  return (
      <MaxWidthContainer>
      <div className="bg-white h-20 border-b border-gray-200 z-1003">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between pt-5">
            <Logo />
            </div>
            </div>
            </div>
            </MaxWidthContainer>
  )
}

export default SimpleNavBar