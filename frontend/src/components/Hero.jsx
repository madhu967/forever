import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* Hero Left  */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
              <p></p>
            </div>
          </div>
      </div>

      {/* Hero Right side  */}
      <div className='w-full sm:w-1/2 flex items-end justify-center bg-gradient-to-tr from-[#272727] via-[#363636] to-[#2b2b2b] overflow-hidden min-h-[350px] sm:min-h-[450px]'>
        <img 
          src="https://www.pngmart.com/files/1/Fashion-Model-Transparent-PNG.png" 
          className='w-full max-h-[480px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]' 
          alt="Fashion Model" 
        />
      </div>
    </div>
  )
}

export default Hero