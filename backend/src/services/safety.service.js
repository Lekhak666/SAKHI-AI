const HIGH_RISK_PATTERNS = [
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
];

const MEDIUM_RISK_PATTERNS = [
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
