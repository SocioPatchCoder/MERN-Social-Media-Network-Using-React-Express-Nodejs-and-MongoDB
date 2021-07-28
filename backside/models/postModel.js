const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
 content: String,
 images:{
     type:Array,
     required:true
 },
likes:[{type:mongoose.Types.ObjectId, ref:'user' }],
commentss:[{type:mongoose.Types.ObjectId, ref:'comment' }],
user:{type:mongoose.Types.ObjectId, ref:'user'}
},{
    timestamps:true
})

module.exports = mongoose.model('post',postSchema)