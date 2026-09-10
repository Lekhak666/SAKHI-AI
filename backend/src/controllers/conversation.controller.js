import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";

export const getConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    next(error);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.status === "closed") {
      return res.status(400).json({
        success: false,
        message: "Conversation is already closed",
      });
    }

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    conversation.messages.push(userMessage);

    await conversation.save();

    res.status(201).json({
      success: true,
      message: userMessage,
      conversationId: conversation._id,
    });
  } catch (error) {
    next(error);
  }
};
