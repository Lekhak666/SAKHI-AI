import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
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

Keep responses conversational and reasonably concise.
Do not overwhelm the user with long lists unless they ask for detailed information.
`;

export const generateAIResponse = async (messages) => {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
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
