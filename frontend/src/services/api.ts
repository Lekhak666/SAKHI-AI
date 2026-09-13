const API_BASE_URL = "http://localhost:5000/api";

export type SakhiLanguage = "en" | "hi" | "bn";

type CreateAssessmentData = {
  language: SakhiLanguage;
  mode: "text" | "voice";
  consent: boolean;
};

type CreateAssessmentResponse = {
  success: boolean;
  assessment: {
    id: string;
    language: SakhiLanguage;
    mode: "text" | "voice";
    consent: boolean;
  };
  conversation: {
    id: string;
  };
};

type SendMessageResponse = {
  success: boolean;
  riskLevel: "low" | "medium" | "high";
  userMessage: {
    role: "user";
    content: string;
    timestamp?: string;
  };
  assistantMessage: {
    role: "assistant";
    content: string;
    timestamp?: string;
  };
  conversationId: string;
};

type ConversationMessage = {
  _id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

type GetConversationResponse = {
  success: boolean;
  conversation: {
    _id: string;
    assessmentId: string;
    messages: ConversationMessage[];
    riskLevel: "low" | "medium" | "high";
    status: "active" | "closed";
  };
};

export const getConversation = async (
  conversationId: string,
): Promise<GetConversationResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch conversation");
  }

  return result;
};

export const createAssessment = async (
  data: CreateAssessmentData,
): Promise<CreateAssessmentResponse> => {
  const response = await fetch(`${API_BASE_URL}/assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create assessment");
  }

  return result;
};

export const sendMessage = async (
  conversationId: string,
  message: string,
): Promise<SendMessageResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send message");
  }

  return result;
};
