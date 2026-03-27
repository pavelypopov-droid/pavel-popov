export interface Flashcard {
  id: string;
  question: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
  domain: string;
  courseId: string;
}

export interface KBEntry {
  id: string;
  courseId: string;
  lessonTitle: string;
  content: string;
  examRelevant?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  examRelevant?: boolean;
  flashcards: Flashcard[];
  knowledgeBase: KBEntry[];
}

export interface QuizResult {
  date: string;
  courseId: string | null; // null = mixed
  total: number;
  correct: number;
  wrong: string[]; // flashcard IDs
}

export interface Progress {
  knownCards: string[];
  repeatCards: string[];
  quizHistory: QuizResult[];
}
