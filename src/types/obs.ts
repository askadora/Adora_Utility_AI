// OBS (Online Booking System) Types

export interface InterviewQuestion {
  id: string;
  category: string;
  subcategory: string;
  goal: string;
  question: string;
  tone: 'friendly' | 'curious' | 'enthusiastic' | 'professional';
  follow_up_style: 'reflective' | 'example-seeking' | 'clarifying' | 'probing';
  answer_type: 'free_text' | 'multiple_choice' | 'rating' | 'yes_no';
  priority: 'high' | 'medium' | 'low';
}

export interface CandidateData {
  id?: string;
  name: string;
  email: string;
  role: string;
  location: string;
  profile?: string;
  phone?: string;
  department?: string;
  hireDate?: string;
  status?: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  candidateData: CandidateData;
  startTime: Date;
  endTime?: Date;
  currentQuestionIndex: number;
  messages: InterviewMessage[];
  status: 'in_progress' | 'completed' | 'abandoned';
  summary?: InterviewSummary;
}

export interface InterviewMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  questionId?: string;
  isTyping?: boolean;
}

export interface InterviewSummary {
  totalQuestions: number;
  completedQuestions: number;
  duration: number; // in minutes
  candidateResponses: CandidateResponse[];
  overallScore?: number;
  strengths: string[];
  areasForImprovement: string[];
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no' | 'strong_no';
  notes: string;
}

export interface CandidateResponse {
  questionId: string;
  question: string;
  response: string;
  followUpQuestions: string[];
  followUpResponses: string[];
  score?: number;
  notes?: string;
}

export interface OBSConfig {
  maxQuestions: number;
  timeLimit: number; // in minutes
  allowRetakes: boolean;
  requireCompletion: boolean;
  autoSave: boolean;
  enableRipplingIntegration: boolean;
  enableAnalytics: boolean;
}

// Survey System Types (for future expansion)
export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  config: SurveyConfig;
  status: 'draft' | 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'multiple_choice' | 'rating' | 'yes_no' | 'file_upload';
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
  fileTypes?: string[];
  maxFileSize?: number;
}

export interface SurveyConfig {
  allowAnonymous: boolean;
  requireEmail: boolean;
  showProgress: boolean;
  allowSaveAndContinue: boolean;
  maxResponses?: number;
  endDate?: Date;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentEmail?: string;
  responses: SurveyAnswer[];
  submittedAt: Date;
  duration: number; // in seconds
}

export interface SurveyAnswer {
  questionId: string;
  answer: string | string[] | number;
  fileUrl?: string;
} 