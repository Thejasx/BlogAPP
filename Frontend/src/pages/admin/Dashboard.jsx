import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [dasboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    pendingBlogs: 0,
    pendingComments: 0,
    recentBlogs: [],
  })

  const { axios, navigate } = useAppContext()

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 h-full overflow-y-auto'>

      <div className='flex flex-wrap gap-6'>

        <div className='flex item-center gap-4 bg-white p-6 min-w-64 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:scale-[1.02] transition-all' >
          <div className='p-3 bg-blue-50 rounded-lg'>
            <img src={assets.dashboard_icon_1} alt="" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dasboardData.blogs}</p>
            <p className='text-gray-500 text-sm'>Published Blogs</p>
          </div>
        </div>

        <div className='flex item-center gap-4 bg-white p-6 min-w-64 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:scale-[1.02] transition-all' >
          <div className='p-3 bg-purple-50 rounded-lg'>
            <img src={assets.dashboard_icon_2} alt="" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dasboardData.comments}</p>
            <p className='text-gray-500 text-sm'>Approved Comments</p>
          </div>
        </div>

        <div className='flex item-center gap-4 bg-white p-6 min-w-64 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:scale-[1.02] transition-all' >
          <div className='p-3 bg-orange-50 rounded-lg'>
            <img src={assets.dashboard_icon_3} alt="" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dasboardData.drafts}</p>
            <p className='text-gray-500 text-sm'>Drafts</p>
          </div>
        </div>

        <div onClick={() => navigate('/admin/pendingBlogs')} className='flex item-center gap-4 bg-white p-6 min-w-64 rounded-xl shadow-sm border border-red-100 cursor-pointer hover:scale-[1.02] transition-all' >
          <div className='p-3 bg-red-50 rounded-lg'>
            <img src={assets.add_icon} alt="" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-2xl font-bold text-red-600'>{dasboardData.pendingBlogs}</p>
            <p className='text-gray-500 text-sm'>Blog Requests</p>
          </div>
        </div>

        <div onClick={() => navigate('/admin/comments')} className='flex item-center gap-4 bg-white p-6 min-w-64 rounded-xl shadow-sm border border-yellow-100 cursor-pointer hover:scale-[1.02] transition-all' >
          <div className='p-3 bg-yellow-50 rounded-lg'>
            <img src={assets.comment_icon} alt="" className='w-6 h-6' />
          </div>
          <div>
            <p className='text-2xl font-bold text-yellow-600'>{dasboardData.pendingComments}</p>
            <p className='text-gray-500 text-sm'>Comment Requests</p>
          </div>
        </div>

      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-10 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p className='font-semibold'>Latest Blogs</p>
        </div>
        <div className='relative max-w-5xl overflow-x-auto shadow-sm border border-gray-100 rounded-xl bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50/50'>
              <tr>
                <th scope='col' className='px-4 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-4 py-4'>Blog Title</th>
                <th scope='col' className='px-4 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-4 py-4 max-sm:hidden'>Author</th>
                <th scope='col' className='px-4 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-4 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dasboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard