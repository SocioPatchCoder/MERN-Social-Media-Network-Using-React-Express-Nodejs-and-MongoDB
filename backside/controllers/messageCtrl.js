const conversations = require('../models/conversationModel')

const Messages = require('../models/messageModel')

const messageCtrl = {
    createMessage: async(req,res) =>{
        try {
            const {recipient, text, media} = req.body
            if(!recipient || (!text.trim() && media.length === 0 )) return;

            const newConversation = await conversations.findOneAndUpdate({
                $or:[
                    {recipients: [req.user._id, recipient]},
                    {recipients: [recipient, req.user._id]}
                ]
            },{
                recipients: [req.user._id, recipient],
                text, media
            },{
                new: true , upsert:true
            })

            const newMessage =  new Messages({
                conversation: newConversation._id,
                sender:req.user._id,
                recipient , text, media
            })

            await newMessage.save()
            
            res.json({newConversation})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   getConversations: async(req,res) =>{
        try {
           const conversation = await conversations.find({
               recipients: req.user._id
           }).sort('updatedAt').populate('recipients', "avatar fullname username")

           res.json({
               conversation,
               result:conversation.length
            })
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMessages: async(req,res) =>{
        try {
           const message = await Messages.find({
               $or:[
                   {
                       sender:req.user._id, recipient: req.params.id,

                   },
                   {
                       sender: req.params.id, recipient: req.user._id
                   }
               ]
           }).sort('-createdAt').populate('recipients', "avatar fullname username")

           res.json({
               message,
               result: message.length
            })
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteMessages: async(req,res) =>{
        try {
           await Messages.findOneAndDelete({_id: req.params.id, sender:req.user._id})
           res.json({msg:'deleted'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = messageCtrl;