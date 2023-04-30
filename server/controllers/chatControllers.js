const { Chat } = require("../models/chatModel");
const { Employees } = require("../models/schema");
const { Seekers } = require("../models/schema");
const { Message } = require("../models/chatModel");

const accessChat = async (req, res) => {
  const { employeeId, seekerId } = req.body;

  if (!employeeId) {
    return res.status(404).json({ message: "Employee not found in request." });
  }
  if (!seekerId) {
    return res.status(404).json({ message: "Seeker not found in request." });
  }

  try {
    const existingChat = await Chat.findOne({
      $and: [
        { "users.userId": employeeId, "users.User_model": "Employees" },
        { "users.userId": seekerId, "users.User_model": "Seekers" },
      ],
    });

    if (existingChat) {
      return res.status(200).json({ chat: existingChat });
    }

    const employee = await Employees.findById(employeeId);
    const seeker = await Seekers.findById(seekerId);

    if (!employee || !seeker) {
      return res.status(404).json({ message: "Employee or seeker not found." });
    }

    const chatData = new Chat({
      users: [
        { User_model: "Employees", userId: employeeId },
        { User_model: "Seekers", userId: seekerId },
      ],
      User_model: "Employees",
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
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(400).json({ message: "Invalid chat id" });
    }

    const messages = await Message.find({
      _id: { $in: chat.messages },
    }).sort({ createdAt: -1 }); //changing this to -1, so that frontend doesn't have to reverse the array.

    res.status(200).json({ chat, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const seekersChat = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: {
        $elemMatch: {
          User_model: req.params.model,
          userId: req.params.id,
        },
      },
    }).populate("latestMessage");

    return res.status(200).json({ chats });
    console.log(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
    throw new Error(error.message);
  }
};

const employeesChat = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: {
        $elemMatch: {
          User_model: req.params.model,
          userId: req.params.id,
        },
      },
    }).populate("latestMessage");
    return res.status(400).json({ chats });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
    throw new Error(error.message);
  }
};

const isUserValid = async (userType, userId) => {
  try {
    let user;
    console.log(userId);
    if (userType === "Employees") {
      user = await Employees.findById(userId);
    } else if (userType === "Seekers") {
      user = await Seekers.findById(userId);
    }
    return !!user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderType, senderId, receiverType, receiverId, message } =
      req.body;

    const isSenderValid = await isUserValid(senderType, senderId);
    const isReceiverValid = await isUserValid(receiverType, receiverId);
    if (!isSenderValid || !isReceiverValid) {
      return res.status(400).json({ message: "Invalid sender or receiver" });
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(400).json({ message: "Invalid chat id" });
    }

    const newMessage = new Message({
      content: [
        {
          message: message,
          sender: senderId,
          senderType: senderType,
          receiver: receiverId,
          receiverType: receiverType,
        },
      ],
    });
    const savedMessage = await newMessage.save();

    chat.messages.push(savedMessage._id);

    chat.latestMessage = savedMessage._id;
    await chat.save();

    res.status(201).json({
      response: "Message sent successfully",
      message: savedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "Internal server error" });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  seekersChat,
  employeesChat,
  sendMessage,
};
