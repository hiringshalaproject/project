const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, refPath: "User_model" }],
    User_model: {  type: String, enum: ['Employees', 'Seekers' ], required: true },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },  
);

const Chat = mongoose.model("Chat", chatModel);




const messageSchema = mongoose.Schema(
  {
    
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content :[{
    message : { type: String, trim: true },
    sender : { type: mongoose.Schema.Types.ObjectId, refPath: 'model_user' }, 
    receiver : { type: mongoose.Schema.Types.ObjectId, refPath: 'model_user' },
    model_user : {  type: String, enum: ['Employees', 'Seekers' ], required: true },
    }]
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = {Chat,Message};


