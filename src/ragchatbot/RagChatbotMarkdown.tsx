import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';

// USAGE: <RagChatbotMarkdown content={message.content} />

// Optional: Preprocess markdown for better formatting
const preprocessMarkdown = (content: string): string => {
  if (!content) return '';
  let processed = content;
  processed = processed.replace(/[ \t]+$/gm, '');
  processed = processed.replace(/\n{3,}/g, '\n\n');
  processed = processed.replace(/\n*(#{1,6}[^\n]*)\n*/g, '\n\n$1\n\n');
  processed = processed.replace(/\n*(\|[^\n]*\|[^\n]*\n(?:\|[^\n]*\|[^\n]*\n)*)\n*/g, '\n\n$1\n\n');
  processed = processed.replace(/([^\n])\n([^\n#\-\*\+\d\s\|])/g, '$1\n\n$2');
  processed = processed.trim();
  if (processed) processed = processed + '\n';
  return processed;
};

interface RagChatbotMarkdownProps {
  content: string;
}

const RagChatbotMarkdown: React.FC<RagChatbotMarkdownProps> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code({inline, className, children, ...rest}: any) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            customStyle={{
              borderRadius: '0.5em',
              fontSize: '0.95em',
              padding: '1em',
              margin: '0.5em 0',
              background: 'var(--tw-prose-pre-bg, #282c34)'
            }}
            {...rest}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...rest}>
            {children}
          </code>
        );
      },
      table: ({ children, ...props }) => (
        <div className="my-1.5 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }) => (
        <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
          {children}
        </thead>
      ),
      tbody: ({ children, ...props }) => (
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props}>
          {children}
        </tbody>
      ),
      tr: ({ children, ...props }) => (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
          {children}
        </tr>
      ),
      th: ({ children, ...props }) => (
        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide bg-gray-50 dark:bg-gray-800" {...props}>
          {children}
        </th>
      ),
      td: ({ children, ...props }) => (
        <td className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 whitespace-normal" {...props}>
          {children}
        </td>
      ),
      p: ({ children, ...props }) => (
        <p className="my-0.5 leading-relaxed" {...props}>
          {children}
        </p>
      ),
      h1: ({ children, ...props }) => (
        <h1 className="my-0.5 text-2xl font-bold" {...props}>
          {children}
        </h1>
      ),
      h2: ({ children, ...props }) => (
        <h2 className="my-0.5 text-xl font-bold" {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3 className="my-0.5 text-lg font-semibold" {...props}>
          {children}
        </h3>
      ),
      h4: ({ children, ...props }) => (
        <h4 className="my-0.5 text-base font-semibold" {...props}>
          {children}
        </h4>
      ),
      ul: ({ children, ...props }) => (
        <ul className="my-0.5 pl-5 list-disc space-y-0" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol className="my-0.5 pl-5 list-decimal space-y-0" {...props}>
          {children}
        </ol>
      ),
      li: ({ children, ...props }) => (
        <li className="my-0 leading-relaxed" {...props}>
          {children}
        </li>
      ),
      blockquote: ({ children, ...props }) => (
        <blockquote className="my-1 pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic" {...props}>
          {children}
        </blockquote>
      )
    } as Components}
  >
    {preprocessMarkdown(content)}
  </ReactMarkdown>
);

export default RagChatbotMarkdown; 