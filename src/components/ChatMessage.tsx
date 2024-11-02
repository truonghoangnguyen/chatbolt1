import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  const components: Partial<Components> = {
    p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
    h1: ({children}) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
    h2: ({children}) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
    h3: ({children}) => <h3 className="text-base font-bold mb-2">{children}</h3>,
    ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
    li: ({children}) => <li className="mb-1">{children}</li>,
    code: ({inline, children}: CodeProps) => (
      inline 
        ? <code className="bg-opacity-20 bg-gray-200 rounded px-1">{children}</code>
        : <code className="block bg-opacity-20 bg-gray-200 rounded p-2 my-2 whitespace-pre-wrap">{children}</code>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic">{children}</blockquote>
    ),
    a: ({href, children}) => (
      <a href={href} className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    table: ({children}) => (
      <div className="overflow-x-auto my-2">
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({children}) => <th className="border border-gray-300 px-4 py-2 bg-opacity-20 bg-gray-200">{children}</th>,
    td: ({children}) => <td className="border border-gray-300 px-4 py-2">{children}</td>
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div className={`max-w-[70%] rounded-lg p-3 shadow-md ${
        isBot 
          ? 'bg-white border border-gray-200' 
          : 'bg-blue-500 text-white'
      }`}>
        {isBot && (
          <div className="flex items-center mb-1">
            <span className="text-blue-500 text-sm font-semibold">Covang AI</span>
          </div>
        )}
        <div className={`text-sm leading-relaxed markdown-content ${
          isBot ? 'text-gray-800' : 'text-white'
        }`}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
