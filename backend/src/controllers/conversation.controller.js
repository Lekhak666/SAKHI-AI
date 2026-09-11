import mongoose from "mongoose";

import Conversation from "../models/Conversation.js";
import { generateAIResponse } from "../services/ai.service.js";
import { assessRisk } from "../services/safety.service.js";

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

    const risk = assessRisk(message);

    conversation.riskLevel = risk.level;

    if (risk.level === "high") {
      const crisisResponse =
        "I'm really sorry you're going through this. You deserve immediate support from a real person. If you may be in immediate danger or think you might hurt yourself, please contact local emergency services or go to the nearest emergency department. If possible, stay with someone you trust and tell them what you're experiencing.";

      const assistantMessage = {
        role: "assistant",
        content: crisisResponse,
      };

      conversation.messages.push(assistantMessage);

      await conversation.save();

      return res.status(201).json({
        success: true,
        riskLevel: risk.level,
        userMessage,
        assistantMessage,
        conversationId: conversation._id,
      });
    }

    const aiResponse = await generateAIResponse(conversation.messages);

    if (!aiResponse) {
      return res.status(502).json({
        success: false,
        message: "SAKHI could not generate a response",
      });
    }

    const assistantMessage = {
      role: "assistant",
      content: aiResponse,
    };

    conversation.messages.push(assistantMessage);

    await conversation.save();

    res.status(201).json({
      success: true,
      riskLevel: risk.level,
      userMessage,
      assistantMessage,
      conversationId: conversation._id,
    });
  } catch (error) {
    next(error);
  }
};
