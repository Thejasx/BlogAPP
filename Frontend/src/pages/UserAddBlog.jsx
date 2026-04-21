import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { parse } from 'marked'

const UserAddBlog = () => {
    const { axios, navigate, userToken, token } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('Startup')

    useEffect(() => {
        if (!userToken) {
            navigate('/login')
        }
    }, [userToken])

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    const generateContent = async () => {
        if (!title) return toast.error('Please enter a title first')

        try {
            setLoading(true)
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)
                toast.success('Content generated successfully')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsAdding(true)

            const blog = {
                title, subTitle, description: quillRef.current.root.innerHTML, category
            }

            const formData = new FormData()
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            // Specifically use userToken in headers for this request if axios default header is not set/cleared
            const { data } = await axios.post('/api/blog/user-add', formData, {
                headers: { authorization: userToken }
            })

            if (data.success) {
                toast.success(data.message);
                setImage(false)
                setTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 bg-gray-50/50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='mb-8'>
                        <h1 className='text-3xl font-bold text-gray-800'>Create New Blog</h1>
                        <p className='text-gray-500'>Share your thoughts with the world. Your blog will be published after admin approval.</p>
                    </div>

                    <form onSubmit={onSubmitHandler} className='bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='space-y-6'>
                                <div>
                                    <p className='text-sm font-medium text-gray-700 mb-2'>Upload Thumbnail</p>
                                    <label htmlFor="image" className='block w-full'>
                                        <div className='border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all min-h-[160px]'>
                                            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className={!image ? 'w-12 h-12 opacity-50' : 'h-32 rounded-lg object-cover'} />
                                            {!image && <p className='text-xs text-gray-400 mt-2'>Click to upload (JPG, PNG, WEBP)</p>}
                                        </div>
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required={!image} />
                                    </label>
                                </div>

                                <div>
                                    <p className='text-sm font-medium text-gray-700 mb-2'>Blog Category</p>
                                    <select onChange={e => setCategory(e.target.value)} value={category} className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-white'>
                                        {blogCategories.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div>
                                    <p className='text-sm font-medium text-gray-700 mb-2'>Blog Title</p>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter a catchy title' className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all' required />
                                </div>

                                <div>
                                    <p className='text-sm font-medium text-gray-700 mb-2'>Sub Title</p>
                                    <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} type="text" placeholder='Brief summary of the blog' className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all' required />
                                </div>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Content</p>
                            <div className={`min-h-[300px] mb-12 relative ${loading ? 'animate-pulse' : ''}`}>
                                <div ref={editorRef} className='rounded-xl border border-gray-200 h-full overflow-hidden'></div>
                                <button 
                                    disabled={loading} 
                                    type='button' 
                                    onClick={generateContent} 
                                    className='absolute bottom-3 right-3 text-xs text-white bg-black/80 px-4 py-2 rounded-lg hover:bg-black transition-all flex items-center gap-2 z-10'
                                >
                                    {loading && <div className='w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin'></div>}
                                    {loading ? 'Generating...' : 'Generate with AI'}
                                </button>
                            </div>
                        </div>

                        <div className='mt-10 flex justify-end'>
                            <button disabled={isAdding} type='submit' className='bg-primary text-white px-10 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2'>
                                {isAdding ? (
                                    <>
                                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                        Submitting...
                                    </>
                                ) : 'Submit Blog for Approval'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserAddBlog
