import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'

const UserLogin = () => {
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setUserToken, setUserData, axios, navigate, userToken, token, setToken } = useAppContext()

    useEffect(() => {
        if (userToken || token) {
            navigate('/')
        }
    }, [userToken, token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post('/api/user/register', { name, email, password })
                if (data.success) {
                    setUserToken(data.token)
                    setUserData(data.user)
                    toast.success('Account created successfully')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post('/api/user/login', { email, password })
                if (data.success) {
                    if (data.isAdmin) {
                        setToken(data.token) // Admin state
                        toast.success('Admin logged in successfully')
                    } else {
                        setUserToken(data.token) // User state
                        setUserData(data.user)
                        toast.success('Logged in successfully')
                    }
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-[90vh] relative'>
            <img src={assets.gradientBackground} alt="" className='absolute top-0 -z-1 opacity-40 h-full w-full object-cover' />
            
            <div className='w-full max-w-md p-8 m-4 bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-2 text-center'>
                        <h1 className='text-4xl font-bold text-gray-800 mb-2'>{state === 'Login' ? 'Welcome Back' : 'Join Us'}</h1>
                        <p className='text-gray-500 font-light'>{state === 'Login' ? 'Please log in to your account' : 'Created an account to start blogging'}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='mt-8 w-full text-gray-700'>
                        {state === 'Sign Up' && (
                            <div className='flex flex-col mb-4'>
                                <label className='text-sm font-medium mb-1'>Full Name</label>
                                <input onChange={e => setName(e.target.value)} value={name} type="text" required placeholder='John Doe' className='bg-white/50 border border-gray-200 rounded-lg p-3 outline-none focus:border-primary/50 transition-all' />
                            </div>
                        )}
                        <div className='flex flex-col mb-4'>
                            <label className='text-sm font-medium mb-1'>Email Address</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder='name@example.com' className='bg-white/50 border border-gray-200 rounded-lg p-3 outline-none focus:border-primary/50 transition-all' />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='text-sm font-medium mb-1'>Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder='••••••••' className='bg-white/50 border border-gray-200 rounded-lg p-3 outline-none focus:border-primary/50 transition-all' />
                        </div>
                        
                        <button type='submit' className='w-full py-3.5 font-semibold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200'>
                            {state === 'Login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className='mt-8 text-center'>
                        {state === 'Login' ? (
                            <p className='text-gray-600'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary font-semibold cursor-pointer hover:underline'>Sign Up</span></p>
                        ) : (
                            <p className='text-gray-600'>Already have an account? <span onClick={() => setState('Login')} className='text-primary font-semibold cursor-pointer hover:underline'>Login</span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
