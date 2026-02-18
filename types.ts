export interface Question {
  id: string;
  text: string;
  options: string[]; // Used for Practice (multiple choice)
  correctAnswer: string; // Used for Exam (text match) and Practice
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  manualTheory?: string; 
  manualQuestions?: Question[]; 
  examQuestions?: Question[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  color: string;
}

export type Role = 'admin' | 'student';

export type LeagueTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export interface User {
  id: string;
  name: string;
  role: Role;
  username: string; 
  xp: number; 
  league: LeagueTier;
  impactScore: number; // For social contribution
  streakDays: number;
  lastActivityDate: string; // YYYY-MM-DD
  avatar?: string; 
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'seasonal';
  goal: number;
  progress: number;
  completed: boolean;
  icon: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: number; // Timestamp
  createdAt: number;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export type AppView = 
  | 'login' 
  | 'admin-dashboard' 
  | 'content-editor' 
  | 'dashboard' 
  | 'topic-detail' 
  | 'study' 
  | 'practice-select' 
  | 'practice' 
  | 'exam' 
  | 'results' 
  | 'student-progress' 
  | 'leaderboard'
  | 'assignments'; 

export interface ExamResult {
  score: number;
  total: number;
  answers: {
    questionId: string;
    questionText: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  timestamp: number;
  topicTitle?: string;
  xpEarned: number;
  type: 'practice' | 'exam';
  timeTakenSeconds?: number;
  isFlaggedForSpeed?: boolean; // Anti-cheat flag
}

// Analytics Types
export interface StudySession {
  id: string;
  userId: string;
  userName: string;
  startTime: number;
  durationSeconds: number;
  activityType: 'study' | 'practice' | 'exam';
  topicId: string;
  timestamp: number;
}

export interface UserProgress {
  userId: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
  type: 'exam' | 'practice';
  exerciseIndex?: number;
  xpEarned: number;
  mistakes?: {
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
  }[];
}