import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish, userAddBlog } from '../controllers/blogController.js'
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'
import userAuth from '../middlewares/userAuth.js'
import anyAuth from '../middlewares/anyAuth.js'

const blogRouter  = express.Router()

blogRouter.post("/add",upload.single('image'),auth,addBlog)
blogRouter.post("/user-add",upload.single('image'),userAuth,userAddBlog)
blogRouter.get('/all',getAllBlogs)
blogRouter.get('/:blogId',getBlogById)
blogRouter.post('/delete',auth,deleteBlogById)
blogRouter.post('/toggle-publish',auth,togglePublish)
blogRouter.post('/add-comment',userAuth,addComment)
blogRouter.post('/comments',getBlogComments)
blogRouter.post('/generate',anyAuth,generateContent)


export default  blogRouter;