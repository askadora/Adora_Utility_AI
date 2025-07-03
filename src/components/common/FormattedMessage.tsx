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
    // Split the text into sections based on patterns
    const sections: React.ReactElement[] = [];
    let currentIndex = 0;
    
    // First, let's identify the main title
    const titleMatch = text.match(/^([^.]+(?:Framework|System|Technology|Solution)[^.]*)/);
    if (titleMatch) {
      sections.push(
        <div key="title" className="font-bold text-xl text-gray-900 dark:text-white mb-4 leading-tight">
          {titleMatch[1].trim()}
        </div>
      );
      currentIndex = titleMatch[0].length;
    }

    // Process the rest of the text
    const remainingText = text.slice(currentIndex);
    
    // Split by "- **" pattern for bullet points with headers
    const bulletSections = remainingText.split(/\s*-\s*\*\*([^*]+)\*\*\s*/);
    
    if (bulletSections.length > 1) {
      // First section is the intro text
      if (bulletSections[0].trim()) {
        sections.push(
          <div key="intro" className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {bulletSections[0].trim()}
          </div>
        );
      }
      
      // Process bullet points
      const bulletPoints: React.ReactElement[] = [];
      for (let i = 1; i < bulletSections.length; i += 2) {
        const header = bulletSections[i];
        const content = bulletSections[i + 1] || '';
        
        if (header) {
          bulletPoints.push(
            <li key={`bullet-${i}`} className="mb-4">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">
                {header}
              </div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                {content.trim()}
              </div>
            </li>
          );
        }
      }
      
      if (bulletPoints.length > 0) {
        sections.push(
          <ul key="bullets" className="space-y-2 mb-4">
            {bulletPoints}
          </ul>
        );
      }
    } else {
      // No bullet pattern found, process as regular paragraphs
      const paragraphs = remainingText.split(/\.\s+(?=[A-Z])/);
      
      paragraphs.forEach((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (trimmed) {
          // Add period back if it was removed by split
          const text = trimmed.endsWith('.') ? trimmed : trimmed + '.';
          sections.push(
            <div key={`para-${index}`} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              {text}
            </div>
          );
        }
      });
    }

    return <div className="space-y-2">{sections}</div>;
  };

  return formatAssistantMessage(content);
}; 