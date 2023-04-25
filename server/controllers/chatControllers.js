const {Chat} = require("../models/chatModel");
const {Employees} = require('../models/schema');
const {Seekers} = require('../models/schema');
const {Message} =require('../models/chatModel')

const accessChat = async (req, res) => {
  const { employeeId, seekerId } = req.body;

  if (!employeeId || !seekerId) {
    if (!employeeId && seekerId) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    if (!seekerId && employeeId) {
      return res.status(404).json({ message: 'Seeker not found.' });
    }
  }

  try {
    const existingChat = await Chat.findOne({
      $and: [
        { 'users.userId': employeeId, 'users.User_model': 'Employees' },
        { 'users.userId': seekerId, 'users.User_model': 'Seekers' }
      ]
    });

    if (existingChat) {
      
      return res.status(200).json({ chat: existingChat });
    }

    const employee = await Employees.findById(employeeId);
    const seeker = await Seekers.findById(seekerId);

    if (!employee || !seeker) {
      return res.status(404).json({ message: 'Employee or seeker not found.' });
    }

    const chatData = new Chat({
      users: [{ User_model: 'Employees', userId: employeeId }, { User_model: 'Seekers', userId: seekerId }],
      User_model: 'Employees',
      latestMessage: null,
    });

    const createdChat = await chatData.save();

    return res.status(201).json({ chat: createdChat });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





    const fetchChats = async (req, res) => {
        try {
          const chat = await Chat.findById({_id : req.params.id})
          if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
          }
          return res.status(200).json({ chat });
        } catch (error) {
          res.status(500).json({ message: 'Server error.' });
          throw new Error(error.message);
        }
      };

    
    
      const seekersChat = async(req,res) => {
        try {
            const chats = await Chat.find({users: {
                $elemMatch: {
                  User_model: req.params.model,
                  userId: req.params.id
                }
              }});
              
            return res.status(200).json({chats});
            console.log(chats);
        }
        catch (error) {
            res.status(500).json({ message: 'Server error.' });
            throw new Error(error.message);
    }
}
    
      const employeesChat = async(req,res) => {
              try {
                  const chats = await Chat.find({users: {
                      $elemMatch: {
                      User_model: req.params.model,
                      userId: req.params.id
                  }
                  }});
              return res.status(400).json({chats});
              }
              catch (error) {
                  res.status(500).json({ message: 'Server error.' });
                  throw new Error(error.message);
              }
      }
      
      
      const sendMessage = async (req, res) => {
        const { chatId, message, senderId, receiverId, model_user } = req.body;
      
        try {
          
          const chat = await Chat.findById(chatId);
          if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
          }
      
          
          const sender = chat.users.find(
            (user) => user.User_model === model_user && user.userId == senderId
          );
          const receiver = chat.users.find(
            (user) => user.User_model === model_user && user.userId == receiverId
          );
          console.log({sender});
          if (!sender || !receiver) {
            if(!sender && receiver)
            {
              return res.status(400).json({message:"sender not found"});
            }
            if(sender && !receiver)
            {
              return res.status(400).json({message:"receiver not found"});
            }
          }
      
          
          const newMessage = new Message({
            chat: chatId,
            content: {
              message:message,
              sender: senderId,
              receiver: receiverId,
              model_user: model_user,
            },
          });
      
          
          await newMessage.save();
      
          
          chat.latestMessage = newMessage._id;
          await chat.save();
          
          return res.status(200).json({ message: "Message sent successfully" });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      };
      
    
      


  
      


module.exports = {accessChat, fetchChats, seekersChat, employeesChat,sendMessage};
    

