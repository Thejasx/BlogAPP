import React from 'react'
import Navbar from '../components/Navbar'
import Headers from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Headers/>
    <BlogList/>
    <NewsLetter/>
    <Footer/>

    </>
  )
}

export default Home