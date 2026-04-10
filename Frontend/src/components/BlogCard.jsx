import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {

    const{title,description,category,image,_id}=blog
    const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
        <img src={image} alt="" className='aspect-vedio' />
        <span className='mb-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-x5'>{category}</span>
        <h3 className='mb-2 font-medium text-gray-900'>{title}</h3>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{__html:description.slice(0,80)}}></p>

    </div>
  )
}

export default BlogCard