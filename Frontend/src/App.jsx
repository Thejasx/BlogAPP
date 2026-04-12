import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import ListBlog from './pages/admin/ListBlog'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>

        <Route path='/admin' element={ true ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>

      </Routes>

    </div>
  )
}

export default App