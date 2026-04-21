import React from 'react'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {


    const { navigate, token, userToken, setUserToken, setUserData } = useAppContext()

    const userLogout = () => {
        setUserToken(null)
        setUserData(null)
        navigate('/login')
    }

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <img onClick={() => { navigate('/') }} src={assets.logo} alt="Logo" className='w-32 sm:w-44 cursor-pointer' />
            
            <div className='flex items-center gap-4'>
                {userToken ? (
                    <div className='flex items-center gap-4'>
                        <button onClick={() => { navigate('/add-blog') }} className='hidden sm:flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-primary/10 text-primary border border-primary/20 px-8 py-2.5 hover:bg-primary/20 transition-all'>
                            Add Blog
                        </button>
                        <button onClick={userLogout} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gray-800 text-white px-8 py-2.5'>
                            Logout
                        </button>
                    </div>
                ) : token ? (
                    <button onClick={() => { navigate('/admin') }} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
                        Dashboard
                        <img src={assets.arrow} alt="arrow" />
                    </button>
                ) : (
                    <button onClick={() => { navigate('/login') }} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
                        Login
                        <img src={assets.arrow} alt="arrow" />
                    </button>
                )}
            </div>

        </div>
    )
}

export default Navbar