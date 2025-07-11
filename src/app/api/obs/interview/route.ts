import { NextRequest, NextResponse } from 'next/server';
import { streamChatCompletion as streamOpenAIChat } from '@/llm/openai/api';
import { UnifiedMessage, UnifiedChatOptions } from '@/llm/unified-models';
import interviewQuestions from '@/data/interview-questions.json';

// OBS Interview System Prompt
const OBS_SYSTEM_PROMPT = `You are an insightful and engaging AI interviewer helping evaluate candidates for a remote, async-friendly team at Adora AI. You will be given a list of questions with metadata.

Ask one question at a time. For each question:
1. Greet the candidate using their name if available.
2. Ask the main question clearly.
3. Based on their response, dynamically generate 1–2 thoughtful follow-up questions that match the tone and follow_up_style.
4. Acknowledge their answer warmly or thoughtfully.
5. Then move on to the next main question.

Use the metadata fields to guide your tone and follow-up strategy:
- "tone": controls the emotional delivery (friendly, curious, enthusiastic).
- "follow_up_style": helps decide what kind of follow-up to generate (reflective, example-seeking).
- Use the "goal" field internally to stay focused on the evaluation criteria.

Personalization data (e.g., name, title, role) will be provided via the Rippling API.

Keep responses conversational and engaging. Be encouraging while maintaining professional standards.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, candidateData, currentQuestionIndex = 0 } = await req.json();

    // Get the current question from our structured data
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    
    if (!currentQuestion) {
      return NextResponse.json(
        { error: 'Interview completed - no more questions available' },
        { status: 400 }
      );
    }

    // Create the system message with context
    const systemMessage: UnifiedMessage = {
      role: 'system',
      content: `${OBS_SYSTEM_PROMPT}

Current Question Context:
- Category: ${currentQuestion.category}
- Subcategory: ${currentQuestion.subcategory}
- Goal: ${currentQuestion.goal}
- Question: ${currentQuestion.question}
- Tone: ${currentQuestion.tone}
- Follow-up Style: ${currentQuestion.follow_up_style}

Candidate Information:
${candidateData ? `
- Name: ${candidateData.name || 'Not provided'}
- Role: ${candidateData.role || 'Not specified'}
- Location: ${candidateData.location || 'Not specified'}
` : 'No candidate data provided'}

Remember: Ask the current question naturally, then generate 1-2 thoughtful follow-ups based on their response. Keep the conversation flowing and engaging.`
    };

    // Add system message to the beginning of the conversation
    const enhancedMessages = [systemMessage, ...messages];

    // Create a TransformStream for streaming the response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Configure chat options
    const options: UnifiedChatOptions = {
      model: 'chatgpt',
      version: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000,
      stream: true
    };

    // Start the streaming process
    streamOpenAIChat(
      enhancedMessages,
      async (chunk) => {
        await writer.write(encoder.encode(JSON.stringify(chunk) + '\n'));
      },
      options
    ).finally(() => {
      writer.close();
    });

    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in OBS interview API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve interview questions
export async function GET() {
  try {
    return NextResponse.json({
      questions: interviewQuestions,
      totalQuestions: interviewQuestions.length
    });
  } catch (error) {
    console.error('Error retrieving interview questions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 