// chatName
// is Group chat
//users
//latest message
//group admin

import mongoose from 'mongoose'

const chatModel = mongoose.Schema(
    {
        chatName: {type:String,trim:true},
        isGroupChat: { type:Boolean,default:false},
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId, // for displaying latest message
            ref: "Message",
        },
        groupAdmin: { //if groupchat then there will be groupadmin
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat",chatModel);

export default Chat;