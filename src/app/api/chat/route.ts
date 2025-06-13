import { NextRequest, NextResponse } from 'next/server';
import { streamChatCompletion as streamGrokChat } from '@/llm/grok/api';
import { streamChatCompletion as streamPerplexityChat } from '@/llm/perplexity/api';
import { streamChatCompletion as streamOpenAIChat } from '@/llm/openai/api';
import { streamChatCompletion as streamDeepInfraChat } from '@/llm/deepinfra/api';
import { UnifiedMessage, UnifiedChatOptions } from '@/llm/unified-models';

export async function POST(req: NextRequest) {
  try {
    const { messages, options } = await req.json();

    // Create a TransformStream for streaming the response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Select the appropriate chat completion function based on the model
    let streamFunction;
    switch (options.model) {
      case 'grok':
        streamFunction = streamGrokChat;
        break;
      case 'perplexity':
        streamFunction = streamPerplexityChat;
        break;
      case 'chatgpt':
        streamFunction = streamOpenAIChat;
        break;
      default:
        streamFunction = streamDeepInfraChat;
    }

    // Start the streaming process
    streamFunction(
      messages,
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
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 