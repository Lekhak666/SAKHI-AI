import mongoose from "mongoose";

import Conversation from "../models/Conversation.js";
import { generateAIResponse } from "../services/ai.service.js";
import { assessRisk, getHighestRiskLevel } from "../services/safety.service.js";

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

    const conversation =
      await Conversation.findById(conversationId).populate("assessmentId");

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

    const language = conversation.assessmentId?.language || "en";

    console.log("========== CONVERSATION DEBUG ==========");
    console.log("Conversation ID:", conversation._id);
    console.log("Assessment ID:", conversation.assessmentId?._id);
    console.log("Selected language:", language);
    console.log("========================================");

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    conversation.messages.push(userMessage);

    const risk = assessRisk(message);

    console.log("========== SAFETY DEBUG ==========");
    console.log("Current message:", message);
    console.log("Current message risk:", risk.level);
    console.log("Previous conversation risk:", conversation.riskLevel);

    conversation.riskLevel = getHighestRiskLevel(
      conversation.riskLevel,
      risk.level,
    );

    console.log("Updated conversation risk:", conversation.riskLevel);
    console.log("==================================");

    if (risk.level === "high") {
      const crisisResponses = {
        en: "I'm really sorry you're going through this. You deserve immediate support from a real person. If you may be in immediate danger or think you might hurt yourself, please contact local emergency services or go to the nearest emergency department. If possible, stay with someone you trust and tell them what you're experiencing.",

        hi: "मुझे बहुत अफ़सोस है कि आप इस समय इतनी मुश्किल स्थिति से गुजर रहे हैं। आपको अभी किसी भरोसेमंद व्यक्ति से वास्तविक सहायता मिलनी चाहिए। अगर आपको लगता है कि आप तत्काल खतरे में हैं या खुद को नुकसान पहुँचा सकते हैं, तो कृपया स्थानीय आपातकालीन सेवाओं से संपर्क करें या नज़दीकी अस्पताल के आपातकालीन विभाग में जाएँ। अगर संभव हो, तो किसी भरोसेमंद व्यक्ति के साथ रहें और उन्हें बताएं कि आप क्या महसूस कर रहे हैं।",

        bn: "আপনি এই কঠিন সময়ের মধ্য দিয়ে যাচ্ছেন বলে আমি সত্যিই দুঃখিত। এই মুহূর্তে আপনার একজন বাস্তব মানুষের কাছ থেকে সহায়তা পাওয়া গুরুত্বপূর্ণ। যদি মনে হয় আপনি তাৎক্ষণিক বিপদের মধ্যে আছেন বা নিজেকে আঘাত করতে পারেন, তাহলে দয়া করে স্থানীয় জরুরি পরিষেবায় যোগাযোগ করুন অথবা কাছের হাসপাতালের জরুরি বিভাগে যান। সম্ভব হলে আপনার বিশ্বাসের কোনো মানুষের সঙ্গে থাকুন এবং তাকে জানান যে আপনি কী অনুভব করছেন।",
      };

      const crisisResponse = crisisResponses[language] || crisisResponses.en;

      const assistantMessage = {
        role: "assistant",
        content: crisisResponse,
      };

      conversation.messages.push(assistantMessage);

      await conversation.save();

      return res.status(201).json({
        success: true,
        riskLevel: conversation.riskLevel,
        userMessage,
        assistantMessage,
        conversationId: conversation._id,
      });
    }

    const aiResponse = await generateAIResponse(
      conversation.messages,
      risk.level,
      language,
    );

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
      riskLevel: conversation.riskLevel,
      userMessage,
      assistantMessage,
      conversationId: conversation._id,
    });
  } catch (error) {
    next(error);
  }
};
