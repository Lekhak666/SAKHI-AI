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
