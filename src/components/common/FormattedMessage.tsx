import React from 'react';

interface FormattedMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ content, role }) => {
  if (role === 'user') {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // Format assistant messages with proper structure
  const formatAssistantMessage = (text: string): React.ReactElement => {
    // Split text into paragraphs and bullet points
    const sections: React.ReactElement[] = [];
    
    // First, check if this looks like a structured response with bullet points
    if (text.includes('- **') || text.includes('**') && text.includes(':')) {
      // Split by bullet points pattern: "- **Header:** Content"
      const parts = text.split(/\s*-\s*\*\*([^*]+)\*\*\s*/);
      
      // First part is usually the intro
      if (parts[0] && parts[0].trim()) {
        const intro = parts[0].trim();
        // Check if it looks like a title (ends with period or is short)
        if (intro.length < 200 && (intro.includes('Framework') || intro.includes('System') || intro.includes('Technology'))) {
          sections.push(
            <div key="title" className="font-bold text-lg text-gray-900 dark:text-white mb-3 leading-tight">
              {intro}
            </div>
          );
        } else {
          sections.push(
            <div key="intro" className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {intro}
            </div>
          );
        }
      }
      
      // Process bullet points
      const bulletPoints: React.ReactElement[] = [];
      for (let i = 1; i < parts.length; i += 2) {
        const header = parts[i];
        const content = parts[i + 1] || '';
        
        if (header) {
          bulletPoints.push(
            <div key={`bullet-${i}`} className="mb-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5365FF] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {header.trim()}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.trim()}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
      
      if (bulletPoints.length > 0) {
        sections.push(
          <div key="bullets" className="space-y-3">
            {bulletPoints}
          </div>
        );
      }
    } else {
      // No bullet pattern, treat as regular paragraphs
      const paragraphs = text.split(/\.\s+(?=[A-Z])/).filter(p => p.trim());
      
      paragraphs.forEach((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (trimmed) {
          const finalText = trimmed.endsWith('.') ? trimmed : trimmed + '.';
          sections.push(
            <div key={`para-${index}`} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              {finalText}
            </div>
          );
        }
      });
    }

    return <div className="space-y-2">{sections}</div>;
  };

  return formatAssistantMessage(content);
}; 