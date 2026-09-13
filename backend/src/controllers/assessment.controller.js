import Assessment from "../models/Assessment.js";
import Conversation from "../models/Conversation.js";

const WELCOME_MESSAGES = {
  en: "Hi, I’m SAKHI. I’m glad you’re here. 🌸 You can take your time here—there’s no need to have the perfect words. I’m here to listen and understand what’s been on your mind. What would you like to talk about today?",

  hi: "नमस्ते, मैं सखी हूँ। मुझे खुशी है कि आप यहाँ हैं। 🌸 आप यहाँ अपना समय ले सकते हैं—आपको अपनी बात कहने के लिए बिल्कुल सही शब्द ढूँढने की ज़रूरत नहीं है। मैं आपकी बात सुनने और समझने के लिए यहाँ हूँ। आज आप किस बारे में बात करना चाहेंगे?",

  bn: "নমস্কার, আমি সখী। আপনি এখানে এসেছেন, এটা জেনে আমার ভালো লাগছে। 🌸 আপনি আপনার সময় নিয়ে কথা বলতে পারেন—আপনার মনের কথা বলার জন্য একদম নিখুঁত শব্দ খুঁজে বের করার কোনো প্রয়োজন নেই। আপনার মনের কথা শুনতে এবং বুঝতে আমি এখানে আছি। আজ আপনি কী নিয়ে কথা বলতে চান?",
};

export const createAssessment = async (req, res, next) => {
  try {
    const { language, mode, consent } = req.body;

    const assessment = await Assessment.create({
      language,
      mode,
      consent,
    });

    const welcomeMessage = WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en;

    const conversation = await Conversation.create({
      assessmentId: assessment._id,
      messages: [
        {
          role: "assistant",
          content: welcomeMessage,
        },
      ],
    });

    res.status(201).json({
      success: true,

      assessment: {
        id: assessment._id,
        language: assessment.language,
        mode: assessment.mode,
        consent: assessment.consent,
      },

      conversation: {
        id: conversation._id,
      },
    });
  } catch (error) {
    next(error);
  }
};
