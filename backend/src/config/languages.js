export const SUPPORTED_LANGUAGES = {
  en: {
    name: "English",
    instruction: `
Respond in natural, conversational English.
Keep your language clear, warm, and easy to understand.
`,
  },

  hi: {
    name: "Hindi",
    instruction: `
Respond in natural, conversational Hindi.
Use Devanagari script.
Prefer commonly used Hindi vocabulary over overly formal,
Sanskritized, or literary language.
`,
  },

  bn: {
    name: "Bengali",
    instruction: `
Respond in natural, conversational Bengali.
Use Bengali script.
Prefer commonly used Bengali vocabulary over overly formal,
literary, or archaic language.
`,
  },
};

export const DEFAULT_LANGUAGE = "en";
