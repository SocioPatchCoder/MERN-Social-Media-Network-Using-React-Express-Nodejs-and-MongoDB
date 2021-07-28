const Posts = require('../models/postModel');
const Users = require('../models/userModel')
const Comments = require('../models/commentModel')


const postCtrl = {
createPost: async (req, res) =>{
    try {
        
        const {content, images} = req.body;
        if(images.length === 0) return res.status(400).json({msg:'Add a photo'})
        const newPost = new Posts ({
            content, images, user:req.user._id
        })
        await newPost.save();

        return res.status(200).json({
            msg: "Post saved",
            newPost: {
                ...newPost._doc,
                user: req.user
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getPost: async (req, res) =>{
    try {
        
   
        const posts = await Posts.find({user: [...req.user.following, req.user._id]}).sort("-createdAt")
        .populate("user likes", "username avatar fullname friends")
        .populate({
            path:"commentss",
            populate:{
                path:"user likes",
                select:"-password"
            }
        })
        
       
        return res.status(200).json({
            msg:'post found',
            result:posts.length,
            posts
        })
        
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
updatePost: async (req, res) =>{
    try {
        
        const {content, images} = req.body;
       
        const post = await Posts.findOneAndUpdate({_id:req.params.id},{
            content , images
        }).populate("user likes", "username avatar fullname")
        
     
        return res.status(200).json({
            msg: "Post update",
            newPost: {
            ...post._doc,
            content, images,
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
likePost: async(req,res)=> {

try {
    
    const post = await Posts.find({_id: req.params.id, likes: req.user._id})
   
    if(post.length > 0) return res.status(400).json({msg:"you have already like this post"})

    const like = await Posts.findOneAndUpdate({_id:req.params.id},{
        $push: {likes: req.user._id}
    },{new:true})

    if(!like) return res.status(400).json({msg:"no post found"})
    return res.json({
        msg: "Post Likes"
    })

} 
catch (err) {
    return res.status(500).json({msg: err.message})
}
   

},
savePost: async(req,res)=> {

    try {
        
        const user = await Users.find({_id: req.user._id, saved: req.params.id})
       
        if(user.length > 0) return res.status(400).json({msg:"you have already save this post"})
    
        await Users.findOneAndUpdate({_id:req.user._id},{
            $push: {saved: req.params.id}
        },{new:true})
    
        return res.json({
            msg: "Post Saved"
        })
    
    } 
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
       
    
    },
unsavePost: async(req,res)=> {

        try {
            
          
        
            await Users.findOneAndUpdate({_id:req.user._id},{
                $pull: {saved: req.params.id}
            },{new:true})
        
            return res.json({
                msg: "Post unSaved"
            })
        
        } 
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
           
        
        },
unlikePost: async(req,res)=> {

    try {
        
    
        const unlinke = await Posts.findOneAndUpdate({_id:req.params.id},{
            $pull: {likes: req.user._id}
        },{new:true})
    
        if(!unlike) return res.status(400).json({msg:"no post found"})
        return res.json({
            msg: "Post UnLikes"
        })
    
    } 
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
       
    
    },
getsavedPost: async (req,res)=> {

        try {
            
        
        const savedposts = await Posts.find({ _id: { $in: req.user.saved}})
        .sort("-createdAt")
        .populate("user likes", "username avatar fullname")
  
         
        return res.json({
            msg:"something",
            savedposts
        })
        
        } 
        catch (err) {
            return res.status(500).json({msg: "wrong"})
        }
           
        
        },
getUserPosts: async (req, res) =>{
        try {
            
       
            const posts = await Posts.find({user: req.params.id}).sort("-createdAt")
            .populate("user likes", "username avatar fullname")
            .populate({
            path:"commentss",
            populate:{
                path:"user likes",
                select:"-password"
            }
        })
            
            
       

            return res.status(200).json({
                msg:'post found',
                result:posts.length,
                posts
            })
            
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
},
getSinglePost: async (req, res) =>{
    try {
        
    
        const post = await Posts.findById(req.params.id)
        .populate("user likes", "username avatar fullname friends")
        .populate({
        path:"commentss",
        populate:{
            path:"user likes",
            select:"-password"
        }
    })
      


        return res.status(200).json({
            
            post
        })
        
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
deletePost: async(req,res)=>{
    try {
        const post = await Posts.findOneAndDelete({_id:req.params.id, user:req.user._id})
        await Comments.deleteMany({_id: {$in: post.commentss}})

        return res.json({
            msg:"Post deleted",
            newPost:{
                ...post,
                user: req.user
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
}

module.exports = postCtrl;