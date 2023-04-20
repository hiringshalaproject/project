const {Chat} = require("../models/chatModel");
const {Employees} = require('../models/schema');
const {Seekers} = require('../models/schema')

const accessChat = async(req,res) =>
{
    const { employeeId, seekerId } = req.body;

    try{

        const employee = await Employees.findById(employeeId);
        const seeker = await Seekers.findById(seekerId);

        if (!employee || !seeker) {
            return res.status(404);
        }
        

        const chat = new Chat({
            users: [{ User_model: 'Employees', userId: employeeId }, { User_model: 'Seekers', userId: seekerId }],
            latestMessage: null,
          });

          const createdChat = await Chat.create(chat);
          return res.status(201).json({ chat: createdChat});
        }

        catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
}

module.exports = accessChat;
    

