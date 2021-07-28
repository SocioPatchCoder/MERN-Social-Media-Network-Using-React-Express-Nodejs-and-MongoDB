const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
id:{type:mongoose.Types.ObjectId},
user:{type:mongoose.Types.ObjectId, ref:'user'},
recipients:[mongoose.Types.ObjectId],
url:String,
content:String,
image:String,
text:String,
isRead:{type:Boolean, default:false}
},{
    timestamps:true
})

module.exports = mongoose.model('notify',notifySchema)