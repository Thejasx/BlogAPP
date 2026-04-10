import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex felx-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

        <div>
            <img src={assets.logo} alt="Logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum fugit labore voluptas assumenda inventore accusamus, minima minus suscipit quisquam consectetur exercitationem neque 
                tempore totam non.</p>

        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section,index)=>(
                <div key={index}>
                    <h3 className='mb-4 font-medium text-gray-900'>{section.title}</h3>
                    <ul className='flex flex-col gap-2 text-sm text-gray-500'>
                        {section.links.map((link,index)=>(
                            <li key={index}>{link}</li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>

        </div >
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 quickblog. All rights reserved.</p>

    </div>
  )
}

export default Footer