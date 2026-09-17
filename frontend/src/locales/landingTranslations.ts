export type SiteLanguage = "en" | "hi" | "bn";

export const LANGUAGE_LABELS: Record<SiteLanguage, string> = {
  en: "English",
  hi: "हिन्दी",
  bn: "বাংলা",
};

export const landingTranslations = {
  en: {
    navbar: {
      tagline: "A friend who listens",
      howItWorks: "How it works",
      support: "Support",
      privacy: "Privacy",
      getSupport: "Get Support",
    },

    hero: {
      badge: "A safer space to be heard",
      titleLine1: "You don't have to",
      titleLine2: "face it alone.",
      description:
        "SAKHI is a compassionate support platform designed to listen, understand and help identify when someone may need additional care.",
      talkToSakhi: "Talk to SAKHI",
      learnHow: "Learn how it works",
      privacyConscious: "Privacy-conscious",
      humanCentered: "Human-centered",
      cardTagline: "Here to listen",
      message1:
        "Take your time. You can share only what you're comfortable sharing.",
      message2: "I've been feeling overwhelmed lately...",
      message3: "I'm listening. Let's take this one step at a time.",
      careMessage: "Your conversation is being handled with care.",
      privacyTitle: "Your privacy matters",
      privacySubtitle: "Designed with care",
    },

    howItWorks: {
      eyebrow: "How SAKHI helps",
      title: "Support that starts with listening.",
      description:
        "SAKHI uses conversations and assessment signals to help identify when someone may need additional support.",
      cards: {
        share: {
          title: "Share",
          description:
            "Tell SAKHI what you're experiencing through text or supported voice interactions.",
        },
        understand: {
          title: "Understand",
          description:
            "SAKHI analyzes relevant signals to identify potential stress and vulnerability.",
        },
        connect: {
          title: "Connect",
          description:
            "Receive guidance toward the appropriate support or intervention.",
        },
      },
    },

    support: {
      eyebrow: "You're not alone",
      title: "Sometimes, asking for help is the strongest step you can take.",
      description:
        "When you're ready, SAKHI is here to listen and help you find the next step.",
      button: "Get Support",
    },

    privacy: {
      title: "Your privacy matters.",
      description:
        "SAKHI is designed around confidentiality, informed consent and responsible use of AI.",
    },

    footer: {
      copyright: "© 2026 SAKHI. A friend who listens.",
      tagline: "Built with empathy, technology and care.",
    },
  },

  hi: {
    navbar: {
      tagline: "एक दोस्त जो आपकी बात सुनता है",
      howItWorks: "यह कैसे काम करता है",
      support: "सहायता",
      privacy: "गोपनीयता",
      getSupport: "सहायता लें",
    },

    hero: {
      badge: "अपनी बात कहने के लिए एक सुरक्षित जगह",
      titleLine1: "आपको यह सब",
      titleLine2: "अकेले नहीं सहना है।",
      description:
        "SAKHI एक संवेदनशील सहायता प्लेटफ़ॉर्म है, जिसे आपकी बात सुनने, समझने और यह पहचानने में मदद करने के लिए बनाया गया है कि आपको अतिरिक्त सहायता की आवश्यकता हो सकती है।",
      talkToSakhi: "SAKHI से बात करें",
      learnHow: "जानें यह कैसे काम करता है",
      privacyConscious: "गोपनीयता का ध्यान",
      humanCentered: "इंसान-केंद्रित",
      cardTagline: "आपकी बात सुनने के लिए",
      message1:
        "अपना समय लें। आप केवल वही साझा कर सकते हैं जिसे साझा करने में आप सहज महसूस करते हैं।",
      message2: "मैं हाल ही में बहुत परेशान और तनाव में महसूस कर रही हूँ...",
      message3: "मैं आपकी बात सुन रही हूँ। आइए इसे एक-एक कदम करके समझते हैं।",
      careMessage: "आपकी बातचीत को पूरी संवेदनशीलता के साथ संभाला जाता है।",
      privacyTitle: "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है",
      privacySubtitle: "सावधानी और संवेदनशीलता के साथ बनाया गया",
    },

    howItWorks: {
      eyebrow: "SAKHI कैसे मदद करती है",
      title: "सहायता की शुरुआत आपकी बात सुनने से होती है।",
      description:
        "SAKHI बातचीत और आकलन से मिलने वाले संकेतों का उपयोग करके यह पहचानने में मदद करती है कि किसी व्यक्ति को अतिरिक्त सहायता की आवश्यकता हो सकती है।",
      cards: {
        share: {
          title: "साझा करें",
          description:
            "टेक्स्ट या उपलब्ध वॉइस इंटरैक्शन के माध्यम से SAKHI को बताएं कि आप क्या महसूस कर रहे हैं।",
        },
        understand: {
          title: "समझें",
          description:
            "SAKHI तनाव और भावनात्मक संवेदनशीलता के संभावित संकेतों को समझने के लिए संबंधित जानकारी का विश्लेषण करती है।",
        },
        connect: {
          title: "जुड़ें",
          description:
            "उचित सहायता या अगले कदम की दिशा में मार्गदर्शन प्राप्त करें।",
        },
      },
    },

    support: {
      eyebrow: "आप अकेले नहीं हैं",
      title: "कभी-कभी मदद माँगना सबसे मजबूत कदम होता है जो आप उठा सकते हैं।",
      description:
        "जब आप तैयार हों, SAKHI आपकी बात सुनने और अगला कदम तय करने में आपकी मदद करने के लिए यहाँ है।",
      button: "सहायता लें",
    },

    privacy: {
      title: "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है।",
      description:
        "SAKHI को गोपनीयता, सूचित सहमति और AI के जिम्मेदार उपयोग को ध्यान में रखकर बनाया गया है।",
    },

    footer: {
      copyright: "© 2026 SAKHI। एक दोस्त जो आपकी बात सुनता है।",
      tagline: "सहानुभूति, तकनीक और संवेदनशीलता के साथ बनाया गया।",
    },
  },

  bn: {
    navbar: {
      tagline: "একজন বন্ধু যে আপনার কথা শোনে",
      howItWorks: "এটি কীভাবে কাজ করে",
      support: "সহায়তা",
      privacy: "গোপনীয়তা",
      getSupport: "সহায়তা নিন",
    },

    hero: {
      badge: "মনের কথা বলার জন্য একটি নিরাপদ জায়গা",
      titleLine1: "আপনাকে সবকিছু",
      titleLine2: "একা সামলাতে হবে না।",
      description:
        "SAKHI একটি সহানুভূতিশীল সহায়তা প্ল্যাটফর্ম, যা আপনার কথা শোনা, বোঝা এবং কখন অতিরিক্ত সহায়তার প্রয়োজন হতে পারে তা শনাক্ত করতে সাহায্য করার জন্য তৈরি করা হয়েছে।",
      talkToSakhi: "SAKHI-এর সঙ্গে কথা বলুন",
      learnHow: "এটি কীভাবে কাজ করে জানুন",
      privacyConscious: "গোপনীয়তার প্রতি যত্নশীল",
      humanCentered: "মানুষকে কেন্দ্র করে তৈরি",
      cardTagline: "আপনার কথা শুনতে এখানে",
      message1:
        "আপনার সময় নিন। আপনি যতটুকু বলতে স্বাচ্ছন্দ্যবোধ করেন, শুধু ততটুকুই শেয়ার করুন।",
      message2: "ইদানীং আমি খুবই চাপের মধ্যে আছি বলে মনে হচ্ছে...",
      message3:
        "আমি আপনার কথা শুনছি। চলুন একবারে একটি করে বিষয় নিয়ে এগিয়ে যাই।",
      careMessage: "আপনার কথোপকথন যত্ন ও সংবেদনশীলতার সঙ্গে পরিচালনা করা হয়।",
      privacyTitle: "আপনার গোপনীয়তা গুরুত্বপূর্ণ",
      privacySubtitle: "যত্ন ও সংবেদনশীলতার সঙ্গে তৈরি",
    },

    howItWorks: {
      eyebrow: "SAKHI কীভাবে সাহায্য করে",
      title: "সহায়তার শুরু হয় আপনার কথা শোনা থেকে।",
      description:
        "SAKHI কথোপকথন এবং মূল্যায়ন থেকে পাওয়া বিভিন্ন সংকেত ব্যবহার করে বুঝতে সাহায্য করে যে কারও অতিরিক্ত সহায়তার প্রয়োজন হতে পারে কি না।",
      cards: {
        share: {
          title: "শেয়ার করুন",
          description:
            "টেক্সট বা সমর্থিত ভয়েস ইন্টারঅ্যাকশনের মাধ্যমে SAKHI-কে জানান আপনি কী অনুভব করছেন।",
        },
        understand: {
          title: "বোঝার চেষ্টা করুন",
          description:
            "SAKHI সম্ভাব্য মানসিক চাপ এবং ঝুঁকির সংকেত শনাক্ত করতে প্রাসঙ্গিক তথ্য বিশ্লেষণ করে।",
        },
        connect: {
          title: "সংযুক্ত হন",
          description:
            "উপযুক্ত সহায়তা বা পরবর্তী পদক্ষেপের দিকে নির্দেশনা পান।",
        },
      },
    },

    support: {
      eyebrow: "আপনি একা নন",
      title:
        "কখনও কখনও সাহায্য চাওয়াই হতে পারে আপনার নেওয়া সবচেয়ে শক্তিশালী পদক্ষেপ।",
      description:
        "আপনি যখন প্রস্তুত, SAKHI আপনার কথা শুনতে এবং পরবর্তী পদক্ষেপ খুঁজে পেতে আপনাকে সাহায্য করার জন্য এখানে আছে।",
      button: "সহায়তা নিন",
    },

    privacy: {
      title: "আপনার গোপনীয়তা গুরুত্বপূর্ণ।",
      description:
        "SAKHI-কে গোপনীয়তা, অবগত সম্মতি এবং AI-এর দায়িত্বশীল ব্যবহারের কথা মাথায় রেখে তৈরি করা হয়েছে।",
    },

    footer: {
      copyright: "© 2026 SAKHI। একজন বন্ধু যে আপনার কথা শোনে।",
      tagline: "সহানুভূতি, প্রযুক্তি এবং যত্নের সঙ্গে তৈরি।",
    },
  },
} as const;
