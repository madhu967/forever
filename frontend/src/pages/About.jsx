import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam ipsa quod, sit recusandae laborum est. Placeat, cum exercitationem aliquid vero consequuntur iusto perferendis ullam labore, pariatur ut nihil id.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, consectetur pariatur maxime quo voluptate maiores officia, unde quasi quae labore perspiciatis eveniet eaque voluptatem vero similique asperiores omnis adipisci deserunt?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minus aliquid maxime ipsa accusantium unde dolorum, velit minima nobis delectus sunt consequatur laborum possimus inventore nihil iste soluta eaque architecto.</p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'> Expedita officiis deserunt rem. Sed quam a quae incidunt corporis. Nemo, accusamus rerum. Officia quia pariatur beatae consequatur enim distinctio, tenetur laborum.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'> Expedita officiis deserunt rem. Sed quam a quae incidunt corporis. Nemo, accusamus rerum. Officia quia pariatur beatae consequatur enim distinctio, tenetur laborum.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'> Expedita officiis deserunt rem. Sed quam a quae incidunt corporis. Nemo, accusamus rerum. Officia quia pariatur beatae consequatur enim distinctio, tenetur laborum.</p>
        </div>
      </div>
      <NewsLetterBox></NewsLetterBox>
    </div>
  )
}

export default About