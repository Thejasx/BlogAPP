import express from 'express';
import { adminLogin, approveBlog, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, getPendingBlogs, rejectBlog } from '../controllers/adminController.js';
import auth from '../middlewares/auth.js';

const router = express.Router()

router.post('/login',adminLogin)
router.get('/comments',auth,getAllComments)
router.get('/blogs',auth,getAllBlogsAdmin)
router.post('/delete-comment',auth,deleteCommentById)
router.post('/approve-comment',auth,approveCommentById)
router.get('/dashboard',auth,getDashboard)
router.get('/pending-blogs', auth, getPendingBlogs)
router.post('/approve-blog', auth, approveBlog)
router.post('/reject-blog', auth, rejectBlog)




export default router;