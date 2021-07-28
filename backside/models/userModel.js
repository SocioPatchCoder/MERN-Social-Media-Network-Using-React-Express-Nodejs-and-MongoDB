const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        maxlength:25,
        require:true
    },
    fullname:{
        type:String,
        trim:true,
        required:true,
        maxlength:25,

    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{  
        type:String,
        default:'',

    },
    gender:{
        type:String,
        default:'male'
    },
    website:{
        type:String,
        default:'',
    },
    phone:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    story:{
        type:String,
        default:'',
        maxlength:200,

    },
    friends:[{type:mongoose.Types.ObjectId, ref:'user'}],
    following:[{type:mongoose.Types.ObjectId, ref:'user'}],
    saved:[{type:mongoose.Types.ObjectId, ref:'user'}]


},{
    timestamps:true
})

module.exports = mongoose.model('user',userSchema)