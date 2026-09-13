import Assessment from "../models/Assessment.js";
import Conversation from "../models/Conversation.js";

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
          content:
            "Hi, I’m SAKHI. I’m glad you’re here. 🌸 You can take your time here—there’s no need to have the perfect words. I’m here to listen and understand what’s been on your mind. What would you like to talk about today?",
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
