import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Moment from 'moment'

const PendingBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const { axios } = useAppContext()

    const fetchPendingBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/pending-blogs')
            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleAction = async (id, action) => {
        try {
            const endpoint = action === 'approve' ? '/api/admin/approve-blog' : '/api/admin/reject-blog'
            const { data } = await axios.post(endpoint, { id })
            if (data.success) {
                toast.success(data.message)
                fetchPendingBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPendingBlogs()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>Blog Publish Requests</h1>
                <p className='text-gray-500'>Review and approve blogs submitted by users.</p>
            </div>

            <div className='relative overflow-x-auto shadow-md sm:rounded-lg bg-white'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Blog Details</th>
                            <th scope='col' className='px-6 py-3'>Author</th>
                            <th scope='col' className='px-6 py-3'>Submitted Date</th>
                            <th scope='col' className='px-6 py-3 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length > 0 ? blogs.map((blog) => (
                            <tr key={blog._id} className='bg-white border-b hover:bg-gray-50'>
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold'>{blog.title}</span>
                                        <span className='text-xs text-gray-400'>{blog.category}</span>
                                    </div>
                                </th>
                                <td className='px-6 py-4'>{blog.author}</td>
                                <td className='px-6 py-4'>{Moment(blog.createdAt).format('LL')}</td>
                                <td className='px-6 py-4 flex items-center justify-center gap-3'>
                                    <button onClick={() => handleAction(blog._id, 'approve')} className='bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-green-200 transition-all'>Approve</button>
                                    <button onClick={() => handleAction(blog._id, 'reject')} className='bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-red-200 transition-all'>Reject</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className='px-6 py-10 text-center text-gray-400'>No pending blog requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingBlogs
