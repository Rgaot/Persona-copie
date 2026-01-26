import Message from "../models/message-model.js";
import { io } from "../utils/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) return res.status(400).json({ message: "A text is required" });

    const newMessage = await new Message({
      senderId: userId,
      text,
    });

    await newMessage.save();

    const message = await Message.aggregate([
      { $match: { _id: newMessage._id } },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $project: {
          text: 1,
          senderId: 1,
          sender: {
            username: 1,
            profileImage: 1,
          },
          createdAt: 1,
        },
      },
    ]);

    io.emit("New message", message[0]);

    res.status(201).json(message[0]);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessage = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $project: {
          text: 1,
          senderId: 1,
          sender: {
            username: 1,
            profileImage: 1,
          },
          createdAt: 1,
        },
      },
    ]);
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
