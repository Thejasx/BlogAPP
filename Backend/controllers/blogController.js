import imagekit from '../config/imageKit.js';
import { toFile } from '@imagekit/nodejs';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../config/gemini.js';


export const addBlog = async(req,res)=>{

    try {
        const {title , subTitle , description ,category,isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file;

        // check all field are present

        if(!title || !description || !category || !imageFile){
            return res.json({success :false,message:"missing required fields"})
        }

        // upload image to imagekit

        const fileBuffer = imageFile.buffer;
        const file = await toFile(fileBuffer, imageFile.originalname)
        const response = await imagekit.files.upload({
            file : file,
            fileName : imageFile.originalname,
            folder:"/blogs"
        })

        // optimization of image

        const optimizedImageUrl = imagekit.helper.buildSrc({
            src: response.url,
            transformation : [
                {quality : 'auto'},
                {format : 'webp'},
                {width: '1280'}
            ]

        });


        const image = optimizedImageUrl;

        await Blog.create({title,subTitle,description,category,image,isPublished})

        res.json({success:true,message:'blog added successfully'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}


export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        
        const blogsWithCommentCount = await Promise.all(blogs.map(async (blog) => {
            const commentCount = await Comment.countDocuments({blog: blog._id, isApproved: true})
            return {...blog._doc, commentCount}
        }))

        res.json({success:true,blogs: blogsWithCommentCount})
        
    } catch (error) {
         res.json({success:false,message:error.message})
        
    }
}


export const getBlogById = async (req,res)=>{
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.json({success:false,message:'Blog not Found'})
        }

        res.json({success:true , blog})
        
    } catch (error) {

         res.json({success:false,message:error.message})
        
    }
}

export const deleteBlogById = async(req,res)=>{
    try {

        const {id} = req.body;
        await Blog.findByIdAndDelete(id)

        await Comment.deleteMany({blog:id})
        res.json({success:true,message:'blog deleted successfully'})
        
    } catch (error) {

         res.json({success:false,message:error.message})
        
    }
}


export const togglePublish = async(req,res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save()
        res.json({success:true,message:'blog status updated'})

        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
}


export const addComment = async(req,res)=>{
    try {

        const {blog,name,content} = req.body
        await Comment.create({blog, name, content})
        res.json({success:true ,message:'Comment added for review'})

        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}


export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} = req.body
        const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});
        res.json({success:true ,comments})

        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
}


export const generateContent = async (req,res)=>{

    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in sample text format')
        res.json({success:true,content})

        
    } catch (error) {
        res.json({success:false,message : error.message})
        
    }

}