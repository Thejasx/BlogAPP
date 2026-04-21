import mongoose from 'mongoose'



const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    subTitle : {
        type :String,
    },
    description : {
        type :String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    isPublished : {
        type : Boolean,
        required : true
    },
    isAdminApproved : {
        type : Boolean,
        default : true
    },
    author : {
        type : String,
        default : "Admin"
    },
    submittedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps:true})


const Blog = mongoose.model('blog' ,blogSchema)

export default Blog;