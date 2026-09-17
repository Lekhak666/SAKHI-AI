import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type SupportedLanguage = "en" | "hi" | "bn";

export type InteractionMode = "text" | "voice";

export interface CreateAssessmentData {
  language: SupportedLanguage;
  mode: InteractionMode;
  consent: boolean;
}

export interface CreateAssessmentResponse {
  success: boolean;

  assessment: {
    id: string;
    language: SupportedLanguage;
    mode: InteractionMode;
    consent: boolean;
  };

  conversation: {
    id: string;
  };
}

export interface ConversationMessage {
  _id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ConversationData {
  _id: string;
  assessmentId:
    | string
    | {
        _id: string;
        language: SupportedLanguage;
        mode: InteractionMode;
      };

  messages: ConversationMessage[];

  riskLevel: "low" | "medium" | "high";

  status: "active" | "closed";
}

export interface GetConversationResponse {
  success: boolean;
  conversation: ConversationData;
}

export interface SendMessageResponse {
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
}

export const createAssessment = async (
  data: CreateAssessmentData,
): Promise<CreateAssessmentResponse> => {
  const response = await api.post<CreateAssessmentResponse>(
    "/assessments",
    data,
  );

  return response.data;
};

export const getConversation = async (
  conversationId: string,
): Promise<GetConversationResponse> => {
  const response = await api.get<GetConversationResponse>(
    `/conversations/${conversationId}`,
  );

  return response.data;
};

export const sendMessage = async (
  conversationId: string,
  message: string,
): Promise<SendMessageResponse> => {
  const response = await api.post<SendMessageResponse>(
    `/conversations/${conversationId}/messages`,
    {
      message,
    },
  );

  return response.data;
};
