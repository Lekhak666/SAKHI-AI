const HIGH_RISK_PATTERNS = [
  // English
  /\bkill myself\b/i,
  /\bkilling myself\b/i,
  /\bend my life\b/i,
  /\btake my own life\b/i,
  /\bsuicide\b/i,
  /\bsuicidal\b/i,
  /\bwant to die\b/i,
  /\bi want to die\b/i,
  /\bi don't want to live\b/i,
  /\bi dont want to live\b/i,
  /\bno reason to live\b/i,
  /\bend it all\b/i,

  // Hindi
  /आत्महत्या/i,
  /आत्महत्या करना/i,
  /आत्महत्या करना चाहता हूँ/i,
  /आत्महत्या करना चाहती हूँ/i,
  /मरना चाहता हूँ/i,
  /मरना चाहती हूँ/i,
  /खुद को मारना/i,
  /खुद को खत्म करना/i,
  /अपनी जान लेना/i,
  /जीना नहीं चाहता/i,
  /जीना नहीं चाहती/i,

  // Bengali
  /আত্মহত্যা/i,
  /আত্মহত্যা করতে চাই/i,
  /মরতে চাই/i,
  /নিজেকে মেরে ফেলতে চাই/i,
  /নিজেকে শেষ করে দিতে চাই/i,
  /নিজের জীবন শেষ করতে চাই/i,
  /বাঁচতে চাই না/i,
];

const MEDIUM_RISK_PATTERNS = [
  // English
  /\bhopeless\b/i,
  /\bworthless\b/i,
  /\bno hope\b/i,
  /\bcan't go on\b/i,
  /\bcant go on\b/i,
  /\bdon't want to be here\b/i,
  /\bdont want to be here\b/i,
  /\bhurt myself\b/i,
  /\bharming myself\b/i,
  /\bself harm\b/i,
  /\bself-harm\b/i,
  /\bpanic attack\b/i,
  /\bextremely depressed\b/i,

  // Hindi
  /बहुत निराश/i,
  /उम्मीद नहीं है/i,
  /बेकार महसूस/i,
  /खुद को नुकसान/i,
  /खुद को चोट/i,
  /खुद को हानि/i,
  /बहुत उदास/i,
  /बहुत परेशान/i,
  /आगे नहीं बढ़ सकता/i,
  /आगे नहीं बढ़ सकती/i,

  // Bengali
  /আশাহীন/i,
  /আশা নেই/i,
  /নিজেকে আঘাত/i,
  /নিজেকে ক্ষতি/i,
  /খুব হতাশ/i,
  /খুব দুঃখিত/i,
  /খুব চিন্তিত/i,
  /আর এগোতে পারছি না/i,
];

export const assessRisk = (message) => {
  if (typeof message !== "string" || !message.trim()) {
    return {
      level: "low",
      reason: null,
    };
  }

  const text = message.trim();

  const highRiskMatch = HIGH_RISK_PATTERNS.find((pattern) =>
    pattern.test(text),
  );

  if (highRiskMatch) {
    return {
      level: "high",
      reason: "possible_immediate_danger",
    };
  }

  const mediumRiskMatch = MEDIUM_RISK_PATTERNS.find((pattern) =>
    pattern.test(text),
  );

  if (mediumRiskMatch) {
    return {
      level: "medium",
      reason: "emotional_distress",
    };
  }

  return {
    level: "low",
    reason: null,
  };
};

const RISK_PRIORITY = {
  low: 0,
  medium: 1,
  high: 2,
};

export const getHighestRiskLevel = (currentLevel, newLevel) => {
  if (RISK_PRIORITY[newLevel] > RISK_PRIORITY[currentLevel]) {
    return newLevel;
  }

  return currentLevel;
};
