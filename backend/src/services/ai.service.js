import Groq from "groq-sdk";

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../config/languages.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const BASE_SYSTEM_PROMPT = `
You are SAKHI, an empathetic AI support assistant.

Your role is to:
- Listen carefully to the user.
- Respond with empathy and respect.
- Help the user reflect on what they are experiencing.
- Ask appropriate follow-up questions.
- Encourage healthy coping strategies when appropriate.
- Never judge, shame, or dismiss the user.
- Never claim to be a human therapist or doctor.
- Never diagnose mental health conditions.
- Never prescribe medication.
- Do not pretend to provide emergency or professional medical care.

Safety rules:
- Follow the safety context provided by the application.
- If the CURRENT user message is marked HIGH risk, prioritize immediate safety and encourage the user to seek real-world human support.
- If the CURRENT user message is LOW or MEDIUM risk, respond naturally to that message.
- A previous high-risk message does not automatically mean the CURRENT message is an emergency.
- Do not repeatedly provide crisis hotline information when the current message does not indicate immediate danger.
- Never invent emergency resources or claim that a particular resource is available in the user's country unless the application explicitly provides it.

Keep responses conversational and reasonably concise.
Do not overwhelm the user with long lists unless they ask for detailed information.

LANGUAGE REQUIREMENT:
The user selected a language for this conversation.

The user may naturally mix English, Hindi, and Bengali in the same message.
Understand mixed-language input correctly.

However, always respond in the selected conversation language unless
the user explicitly asks to switch languages.

Do not unnecessarily translate the user's message.

Maintain the selected language consistently throughout your response.
`;

export const generateAIResponse = async (
  messages,
  currentRiskLevel,
  language = DEFAULT_LANGUAGE,
) => {
  console.log("========== AI DEBUG ==========");
  console.log("AI current risk level:", currentRiskLevel);
  console.log("AI selected language:", language);
  console.log("==============================");

  const selectedLanguage =
    SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];

  const languageContext = `
SELECTED CONVERSATION LANGUAGE:
${selectedLanguage.name}

LANGUAGE INSTRUCTIONS:
${selectedLanguage.instruction}
`;

  const safetyContext = `
APPLICATION SAFETY CONTEXT:
Current user message risk level: ${currentRiskLevel}

Important:
This risk level refers specifically to the CURRENT user message.
The conversation may contain previous messages with higher risk.
Do not treat a previous high-risk message as proof that the current message is high-risk.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: BASE_SYSTEM_PROMPT,
      },
      {
        role: "system",
        content: languageContext,
      },
      {
        role: "system",
        content: safetyContext,
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
};
