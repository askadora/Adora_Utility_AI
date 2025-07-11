# OBS (Online Booking System) - AI-Powered Interview Chatbot

## Overview

The OBS system is a comprehensive AI-powered interview chatbot designed for Adora AI's recruitment process. It provides a seamless, intelligent interview experience that can be easily adapted for survey systems and other interactive applications.

## Features

### 🎯 Core Functionality
- **AI-Powered Interviews**: ChatGPT-driven conversational interviews
- **Structured Question Management**: JSON-based question configuration with metadata
- **Real-time Streaming**: Live chat interface with typing indicators
- **Progress Tracking**: Visual progress indicators and session management
- **Candidate Personalization**: Integration with Rippling API for candidate data
- **Responsive Design**: Mobile-friendly interface with dark mode support

### 🔧 Technical Features
- **TypeScript**: Fully typed for better development experience
- **Next.js 14**: App Router with server-side rendering
- **Streaming Responses**: Real-time AI responses using TransformStream
- **State Management**: React hooks for interview session management
- **Error Handling**: Comprehensive error handling and fallbacks
- **Modular Architecture**: Reusable components for future expansion

## System Architecture

```
src/
├── app/
│   ├── apply/                    # Apply page with OBS integration
│   │   ├── page.tsx             # Main apply page component
│   │   └── metadata.ts          # SEO metadata
│   └── api/
│       └── obs/                 # OBS API endpoints
│           ├── interview/       # Interview chatbot API
│           └── rippling/        # Rippling integration API
├── components/
│   └── obs/
│       └── InterviewChat.tsx    # Main chat interface component
├── data/
│   └── interview-questions.json # Structured interview questions
└── types/
    └── obs.ts                   # TypeScript type definitions
```

## API Endpoints

### `/api/obs/interview`
- **POST**: Start or continue interview session
- **GET**: Retrieve interview questions
- **Features**: Streaming responses, question progression, candidate personalization

### `/api/obs/rippling`
- **GET**: Fetch candidate data by ID or email
- **POST**: Create or update candidate in Rippling
- **Features**: HR system integration, candidate data enrichment

## Question Structure

Each interview question includes comprehensive metadata:

```json
{
  "id": "q1",
  "category": "Culture & Collaboration",
  "subcategory": "Async Work Style",
  "goal": "Understand time management in async/remote environments",
  "question": "How do you stay on track in async/remote environments?",
  "tone": "friendly",
  "follow_up_style": "reflective",
  "answer_type": "free_text",
  "priority": "high"
}
```

### Metadata Fields
- **category**: Broad skill area (Culture & Collaboration, Technical Skills, etc.)
- **subcategory**: Specific trait or competency
- **goal**: Evaluation objective for the question
- **tone**: AI delivery style (friendly, curious, enthusiastic, professional)
- **follow_up_style**: Follow-up question strategy (reflective, example-seeking, etc.)
- **answer_type**: Response format (free_text, multiple_choice, rating, yes_no)
- **priority**: Question importance (high, medium, low)

## ChatGPT Integration

### System Prompt
The AI interviewer uses a sophisticated system prompt that:
- Provides context about the current question and candidate
- Guides tone and follow-up strategy based on metadata
- Maintains professional yet engaging conversation flow
- Personalizes interactions using candidate data

### Response Streaming
- Real-time streaming responses for natural conversation flow
- Typing indicators and smooth UI updates
- Error handling with graceful fallbacks

## Rippling Integration

### Candidate Data Enrichment
- Fetches candidate information from Rippling HR system
- Personalizes interview experience with name, role, location
- Enables seamless HR workflow integration

### API Configuration
```env
RIPPLING_API_BASE_URL=https://api.rippling.com
RIPPLING_API_KEY=your_api_key_here
```

## Usage Flow

1. **Application Form**: Candidate fills out basic information
2. **Interview Start**: AI greets candidate and begins structured interview
3. **Question Progression**: AI asks questions one by one with follow-ups
4. **Real-time Chat**: Natural conversation with streaming responses
5. **Completion**: Interview summary and next steps

## Environment Variables

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Rippling Integration
RIPPLING_API_KEY=your_rippling_api_key
RIPPLING_API_BASE_URL=https://api.rippling.com

# Supabase (for data storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Future Expansion

### Survey System Integration
The OBS architecture is designed to support survey systems:
- Reusable chat interface components
- Flexible question types and configurations
- Modular API structure for different use cases
- Comprehensive type system for extensibility

### Additional Features
- **Analytics Dashboard**: Interview performance metrics
- **Multi-language Support**: International candidate interviews
- **Video Integration**: Video call capabilities
- **Advanced Scoring**: AI-powered candidate evaluation
- **Integration APIs**: Additional HR system integrations

## Development

### Prerequisites
- Node.js 18+
- Next.js 14
- TypeScript
- OpenAI API access
- Rippling API access (optional)

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run development server: `npm run dev`
5. Visit `http://localhost:3000/apply`

### Testing
- Unit tests for components and utilities
- Integration tests for API endpoints
- E2E tests for complete interview flow

## Contributing

1. Follow TypeScript best practices
2. Maintain component reusability
3. Add comprehensive error handling
4. Update documentation for new features
5. Test thoroughly before submitting

## License

This project is proprietary to Adora AI. All rights reserved. 