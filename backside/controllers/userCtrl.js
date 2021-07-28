const Users = require("../models/userModel");


const userCtrl = {
    searchUser: async (req,res)=>{
        try {
            const users =  await Users.find({username : {$regex: req.query.username}}).limit(10)
            .select("fullname username avatar")

            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req,res)=>{
        try {
            const user =  await Users.findOne({_id : req.params.id})
            .select("-password").populate("friends following" , "-password") 
            if(!user) return res.status(400).json({msg: "No user Exists"})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req,res) =>{
        try {
            
            const { website, fullname, story, phone, address } =req.body;
            if(!fullname)  return res.status(500).json({msg: "Fullname is requires"})

            const user = await Users.findOneAndUpdate({_id: req.body._id},{
                website, fullname, story, phone, address
            })

            res.json({msg:'update success', user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    friend: async (req,res) =>{
        try {
           
            const user = await Users.find({_id: req.params.id, friends: req.user._id} )
            if(user.length > 0) return res.status(400).json({msg: "you have already followed"})

            const newUser = await Users.findOneAndUpdate({_id: req.params.id},{
                $push: {friends: req.user._id}
            },{ new: true}).populate("friends following", "-password")

            await Users.findOneAndUpdate({_id: req.user._id},{
                $push:{following: req.params.id}
            },{ new: true})


            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unfriend: async (req,res) =>{
        try {
            
            

            const newUser = await Users.findOneAndUpdate({_id: req.params.id},{
                $pull:{friends: req.user._id}
            },{ new: true}).populate("friends following" , "-password")

            await Users.findOneAndUpdate({_id: req.user._id},{
                $pull:{following: req.params.id}
            },{ new: true})


            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
}

module.exports = userCtrl;