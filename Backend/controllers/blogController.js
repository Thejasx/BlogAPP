import fs from 'fs'
import imagekit from '../config/imageKit.js';
import { toFile } from '@imagekit/nodejs';
import Blog from '../models/Blog.js';


export const addBlog = async(req,res)=>{

    try {
        const {title , subTitle , description ,category,isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file;

        // check all field are present

        if(!title || !description || !category || !imageFile){
            return res.json({success :false,message:"missing required fields"})
        }

        // upload image to imagekit

        const fileBuffer = fs.readFileSync(imageFile.path)
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