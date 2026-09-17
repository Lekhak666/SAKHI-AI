export interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}

export interface SpeechRecognitionEventLike extends Event {
  results: {
    [index: number]: SpeechRecognitionResultLike;
  };
}

export interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

export interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onresult: ((event: SpeechRecognitionEventLike) => void) | null;

  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;

  onend: (() => void) | null;
}

export type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}
