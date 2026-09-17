import Assessment from "../models/Assessment.js";
import Conversation from "../models/Conversation.js";

const welcomeMessages = {
  en: "Hi, I’m SAKHI. I’m glad you’re here. 🌸 You can take your time here—there’s no need to have the perfect words. I’m here to listen and understand what’s been on your mind. What would you like to talk about today?",

  hi: "नमस्ते, मैं सखी हूँ। मुझे खुशी है कि आप यहाँ हैं। 🌸 आप अपना समय ले सकते हैं—आपको सब कुछ सही शब्दों में बताने की ज़रूरत नहीं है। मैं आपकी बात सुनने और समझने के लिए यहाँ हूँ। आज आप किस बारे में बात करना चाहेंगे?",

  bn: "নমস্কার, আমি সখী। আপনি এখানে এসেছেন, এতে আমি আনন্দিত। 🌸 আপনি আপনার সময় নিতে পারেন—সবকিছু নিখুঁতভাবে বোঝানোর দরকার নেই। আপনার মনের কথা শোনা এবং বোঝার জন্য আমি এখানে আছি। আজ আপনি কী নিয়ে কথা বলতে চান?",
};

export const createAssessment = async (req, res, next) => {
  try {
    const { language, mode, consent } = req.body;

    const assessment = await Assessment.create({
      language,
      mode,
      consent,
    });

    const conversation = await Conversation.create({
      assessmentId: assessment._id,

      messages: [
        {
          role: "assistant",
          content: welcomeMessages[language],
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
