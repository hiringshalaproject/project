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
const sendMessage = async(req, res)=> {
  try {
    
    const { chatId,senderId, receiverId, message } = req.body;

    
    const newMessage = new Message({
      chatId : chatId,
      content:{ message : message,
      sender: senderId,
      receiver: receiverId}
    });

    
    await newMessage.save();

    
    await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: newMessage._id },
      { new: true }
    );

    
    res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


  
      


module.exports = {accessChat, fetchChats, seekersChat, employeesChat,sendMessage};
    

